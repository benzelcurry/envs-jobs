// Controller for Question methods

import Question from '../models/Question';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';

// Return list of Questions on Get
export const question_list: RequestHandler = async (req, res, next) => {
  const questions = await Question.find();

  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(200).json('There are no questions currently in the database!');
  }
};
