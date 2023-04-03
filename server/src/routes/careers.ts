import express, { RequestHandler } from 'express';
const router = express.Router();

import { career_list, add_career } from '../controllers/careerController';

// Returns list of careers on GET
router.get('/', career_list);

// Adds a new career on POST
// TODO: Restrict to admins; maybe add middleware to route that does this?
router.post('/', add_career);

export default router;
