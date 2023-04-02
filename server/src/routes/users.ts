import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import {
  user_list,
} from '../controllers/userController';

router.get('/', user_list);

export default router;
