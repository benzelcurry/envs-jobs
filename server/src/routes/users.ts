import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import {
  user_list,
  create_user,
  login_user,
  user_info,
  assign_attributes
} from '../controllers/userController';

// Returns list of users; PROBABLY SHOULD DELETE THIS ROUTE, POINTLESS
router.get('/', user_list);

// Logs user in on POST
router.post('/login', login_user);

// Returns user info on POST
router.post('/info', user_info);

// Creates a new user on POST
router.post('/', create_user);

// Updates user attributes on PUT
router.put('/', assign_attributes);

export default router;
