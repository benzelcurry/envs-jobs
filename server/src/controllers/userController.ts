// Controller for User methods

import User from '../models/User';

import { RequestHandler } from 'express';
import async from 'async';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Return list of Users on GET
export const user_list: RequestHandler = (req, res, next) => {
  res.json('Hello, Users!')
};