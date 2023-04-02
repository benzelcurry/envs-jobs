import express, { RequestHandler } from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    msg: 'Career section!'
  });
});

export default router;
