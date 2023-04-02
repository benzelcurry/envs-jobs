import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Career section!'
  });
});

export default router;
