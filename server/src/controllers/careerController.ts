// Controller for Career methods

import Career from '../models/Career';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { Callback } from 'mongoose';
import async from 'async';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Return list of Careers on GET
export const career_list: RequestHandler = (req, res, next) => {
  res.json("Here's the careers!");
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
