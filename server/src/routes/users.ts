import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'This is where your users will be returned from!'
  });
});

export default router;
