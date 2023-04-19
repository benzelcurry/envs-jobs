import { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
require('dotenv').config();

const checkAdmin: RequestHandler = (req, res, next) => {
  if (!req.body.token) return res.status(400).json({ error: 'Path restricted to admins' });
  const decodedToken = jwt.verify(
    req.body.token,
    process.env.SECRET_KEY as string
  ) as JwtPayload;
  if (!decodedToken || !decodedToken.is_admin) {
    return res.status(400).json({ error: 'Path restricted to admins' })
  };
  next();
};

export default checkAdmin;
