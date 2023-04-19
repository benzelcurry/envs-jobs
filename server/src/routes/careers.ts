import express, { RequestHandler } from 'express';
const router = express.Router();

import {
  career_list,
  add_career,
  update_career
} from '../controllers/careerController';

import checkAdmin from '../middleware/checkAdmin';

// Returns list of careers on GET
router.get('/', career_list);

// Adds a new career on POST
// TODO: Restrict to admins; maybe add middleware to route that does this?
router.post('/', checkAdmin, add_career);

// Updates a career on PUT
// TODO: Restrict to admins; maybe add middleware to route that does this?
router.put('/', checkAdmin, update_career);

export default router;
