// Primary app module

// TO-DO:
// * Add a Jest testing suite for API endpoints
// * Add routes for API endpoints
// * Potentially add more models
// * Find 3rd party APIs for things like job listings and salaries
// * Populate database with some careers and traits, maybe do this thru front-end?
// * Decide if going to handle attribute generation via quiz on FE or BE
// * Implement some form of auth (JWT?)

import express, { Application, Request, Response, NextFunction } from 'express';
import careers from './routes/careers';
import users from './routes/users';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use('/careers', careers);
app.use('/users', users);

app.use('/', (req: Request, res: Response): void => {
  res.json('Hello, World!');
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});
