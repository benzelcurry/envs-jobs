// Controller for Career methods

import User from '../models/User';

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