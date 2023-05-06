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

// Allow admins to add a new Question on POST
export const add_question = [
  // Validate and sanitize fields
  body('prompt')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Question must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-?]+$/)
    .withMessage(
      'Question may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('answerOne')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Answer one must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Answer one may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('attributeOne')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Attribute one must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Attribute one may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('answerTwo')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Answer two must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Answer two may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('attributeTwo')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage('Attribute two must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Attribute two may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingQuestion = await Question.findOne({
        prompt: req.body.prompt
      });

      if (existingQuestion) {
        return res.status(400).json({
          errors: [
            'Question with this prompt already exists. If you wish to change an existing question, please use the question modification form'
          ]
        });
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      } else {
        const question = new Question({
          prompt: req.body.prompt,
          answer_one: [req.body.answerOne, req.body.attributeOne],
          answer_two: [req.body.answerTwo, req.body.attributeTwo || '']
        });

        question.save();
        res.status(200).json('Question added!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];

// Allows admin to update existing questions on PUT
export const update_question = [
  // Validate and sanitize fields
  body('prompt')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Question must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-?]+$/)
    .withMessage(
      'Question may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('answerOne')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Answer one must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Answer one may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('attributeOne')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Attribute one must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Attribute one may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('answerTwo')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Answer two must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Answer two may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  body('attributeTwo')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 2 })
    .withMessage('Attribute two must be at least two characters long')
    .matches(/^[a-zA-Z0-9\s'"-]+$/)
    .withMessage(
      'Attribute two may only contain letters, numbers, spaces, hyphens, quotation marks, and apostrophes'
    ),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      } else {
        await Question.findByIdAndUpdate(
          req.body._id,
          {
            $set: {
              prompt: req.body.prompt,
              answer_one: [req.body.answerOne, req.body.attributeOne],
              answer_two: [req.body.answerTwo, req.body.attributeTwo || '']
            }
          },
          { new: true, upsert: true }
        );
        res.status(200).json('Career successfully modified!');
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  }
];

// Allows admins to delete questions
export const delete_question: RequestHandler = (req, res, next) => {
  Question.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.status(200).json('Question deleted!');
    })
    .catch((err) => {
      return res.status(500).json({ errors: err });
    });
};
