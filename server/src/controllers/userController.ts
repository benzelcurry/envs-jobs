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
export const user_list: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find();
    const userList: string[] = [];

    if (users) {
      for (const user of users) {
        const fullName = `${user.first_name} ${user.family_name}`;
        userList.push(fullName);
      }
      res.status(200).json(userList);
    } else {
      res.status(200).json('There are no users!');
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }
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

        user.save();
        return res.status(200).json('User created!');
      }
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  }
];

// Log user in on POST
export const login_user: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        errors: 'Username does not exist'
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (isValid) {
          const secret = process.env.SECRET_KEY as string;
          const token = jwt.sign(
            {
              id: user._id
            },
            secret,
            { expiresIn: '30d' }
          );

          return res.status(200).json({
            message: 'Successful',
            token
          });
        } else {
          return res.status(400).json({ errors: 'Incorrect password' });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
};

// Get user info from ID on POST
export const user_info: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.token) {
      const decrypt = jwt.verify(
        req.body.token,
        process.env.SECRET_KEY as string
      );
      const user = await User.findOne({ _id: decrypt });
      if (!user) {
        return res.status(400).json({
          errors: 'No user was found matching that ID'
        });
      } else {
        return res.status(200).json({
          username: user.username,
          first_name: user.first_name,
          family_name: user.family_name,
          is_admin: user.is_admin,
          attributes: user.attributes
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
};
