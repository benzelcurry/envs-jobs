// Controller for User methods

import User from '../models/User';

import async from 'async';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
