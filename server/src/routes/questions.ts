import express, { RequestHandler } from 'express';

const router = express.Router();

import { question_list } from '../controllers/questionController';

import checkAdmin from '../middleware/checkAdmin';

///// QUESTION ROUTES /////

// Returns a list of questions on GET
router.get('/', question_list);

export default router;
