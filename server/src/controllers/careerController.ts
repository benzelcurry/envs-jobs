// Controller for Career methods

import Career from '../models/Career';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { Callback } from 'mongoose';
import async from 'async';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

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

// Allow admins to add new Careers on POST
// TO-DO: ADD JWT AUTHENTICATION TO ENSURE THAT DATA IS COMING FROM AN ADMIN
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
    .withMessage('Please submit a minimum of 3 attributes'),
  async (req: Request, res: Response, next: NextFunction) => {
    // ADD LOGIC HERE TO ENSURE THAT DATA IS COMING FROM AN ADMIN
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
        const career = new Career({
          title: req.body.title,
          description: req.body.description,
          attributes: req.body.attributes
        });

        career.save();
        res.status(200).json('Career added!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];

// Allow admins to update careers
// TODO: Add JWT auth, either to this or to route
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
    .withMessage('Please submit a minimum of 3 attributes'),
  async (req: Request, res: Response, next: NextFunction) => {
    // ADD LOGIC HERE TO ENSURE THAT DATA IS COMING FROM AN ADMIN
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
        Career.findByIdAndUpdate(existingCareer?._id, {
          title: req.body.title,
          description: req.body.description,
          attributes: req.body.attributes
        });
        res.status(200).json('Career successfully modified!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];
