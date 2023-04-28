import express, { RequestHandler } from 'express';

const router = express.Router();

import { question_list, add_question } from '../controllers/questionController';

import checkAdmin from '../middleware/checkAdmin';

///// QUESTION ROUTES /////

// Returns a list of questions on GET
router.get('/', question_list);

// Allows admins to create questions on POST
router.post('/', checkAdmin, add_question);

export default router;
