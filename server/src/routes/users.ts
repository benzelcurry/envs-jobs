import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { user_list, create_user, login_user } from '../controllers/userController';

// Returns list of users; PROBABLY SHOULD DELETE THIS ROUTE, POINTLESS
router.get('/', user_list);

// Logs user in on POST
router.post('/login', login_user);

// Creates a new user on POST
router.post('/', create_user);

export default router;
