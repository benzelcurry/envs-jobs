// Controller for User methods

import User from '../models/User';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { Callback } from 'mongoose';
import async from 'async';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Return list of Users on GET
export const user_list: RequestHandler = (req, res, next) => {
  res.json('Hello, User!');
};

// Create new User on POST
export const create_user = [
  // Validate and sanitize fields
  body('first_name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('First name must be between 1 and 20 characters')
    .matches(/^[a-zA-Z'-]+$/)
    .withMessage(
      'First name may only contain letters, hyphens, and apostrophes'
    ),
  body('family_name')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('First name must be between 1 and 20 characters')
    .matches(/^[a-zA-Z'-]+$/)
    .withMessage(
      'Family name may only contain letters, hyphens, and apostrophes'
    ),
  body('username')
    .trim()
    .isLength({ min: 3, max: 16 })
    .withMessage('Username must be between 3 and 16 characters')
    .isAlphanumeric()
    .withMessage('Usernames may only contain alphanumeric characters'),
  body('password')
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage('Password must be between 6 and 100 characters long'),
  body('confirm_password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Password confirmation field must not be empty')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).json({
          errors: ['Username already exists']
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      } else {
        const user = new User({
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          username: req.body.username,
          password: hashedPassword,
          is_admin: false,
          attributes: []
        });

        const createUser = await user.save();
        res.status(200).json('User created!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];
