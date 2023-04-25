// Controller for Career methods

import Career from '../models/Career';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

// Return list of Careers on GET
export const career_list: RequestHandler = async (req, res, next) => {
  const careers = await Career.find();

  if (careers) {
    res.status(200).json(careers);
  } else {
    res.status(200).json('There are no careers in the database!');
  }
};

// Return info for single Career on GET
export const career_info: RequestHandler = async (req, res, next) => {
  const careerTitle = req.params.id;
  const career = await Career.findOne({ title: careerTitle });

  if (career) {
    res.status(200).json(career);
  } else {
    res.status(400).json('Career does not exist');
  }
};

// Allow admins to add new Careers on POST
export const add_career = [
  // Validate and sanitize fields
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Career title must be between 2 and 20 characters')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Career title may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('description')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Career description must be at least 2 characters long'),
  body('attributes')
    .isArray({ min: 3 })
    .withMessage('Please submit a minimum of 3 attributes')
    .custom((value) => {
      const hasEmptyString = value.some((item: string) => item === '');
      if (hasEmptyString) {
        throw new Error('Please fill out all attribute fields');
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingCareer = await Career.findOne({ title: req.body.title });

      if (existingCareer) {
        return res.status(400).json({
          errors: [
            'Career already exists. If you wish to change an existing career, please update it instead.'
          ]
        });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      } else {
        const { job_photo, bio_photo } = req.files as Record<
          string,
          Express.Multer.File[]
        >;
        const career = new Career({
          title: req.body.title,
          description: req.body.description,
          attributes: req.body.attributes,
          job_photo: job_photo?.[0]?.filename,
          bio_photo: bio_photo?.[0]?.filename,
          bio_quote: req.body.quote ? req.body.quote : undefined
        });

        career.save();
        res.status(200).json('Career added!');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ errors: err });
    }
  }
];

// Allow admins to update careers
export const update_career = [
  // Validate and sanitize fields
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Career title must be between 2 and 20 characters')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Career title may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('description')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Career description must be at least 2 characters long'),
  body('attributes')
    .isArray({ min: 3 })
    .withMessage('Please submit a minimum of 3 attributes')
    .custom((value) => {
      const hasEmptyString = value.some((item: string) => item === '');
      if (hasEmptyString) {
        throw new Error('Please fill out all attribute fields');
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingCareer = await Career.findOne({
        title: req.body.originalTitle
      });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      } else {
        const { job_photo, bio_photo } =
          (req.files as Record<string, Express.Multer.File[]>) || {};
        await Career.findByIdAndUpdate(
          existingCareer?._id,
          {
            $set: {
              title: req.body.title,
              description: req.body.description,
              attributes: req.body.attributes,
              job_photo: job_photo?.[0]?.filename,
              bio_photo: bio_photo?.[0]?.filename,
              bio_quote: req.body.quote ? req.body.quote : undefined
            }
          },
          { new: true, upsert: true }
        );
        res.status(200).json('Career successfully modified!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];
