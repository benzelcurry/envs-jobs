import express, { RequestHandler } from 'express';
const router = express.Router();

import { career_list } from '../controllers/careerController';

router.get('/', career_list);

export default router;
