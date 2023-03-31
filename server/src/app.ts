import express, { Application, Request, Response, NextFunction } from 'express';

require('dotenv').config();

const app: Application = express();

app.use('/', (req: Request, res: Response): void => {
  res.json('Hello, World!');
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on Port: ${process.env.PORT}`);
});