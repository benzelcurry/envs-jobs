// Controller for User methods

// TO-DO
// * Make function for creating new users
import User from '../models/User';

import { RequestHandler } from 'express';
import async from 'async';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Return list of Users on GET
export const user_list: RequestHandler = (req, res, next) => {
  res.json('Hello, User!');
};