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
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import careers from './routes/careers';
import users from './routes/users';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const mongoDB = String(process.env.MONGODB_URI);
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
} as ConnectOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app: Application = express();

// UPDATE CORS TO ONLY ACCEPT REQUESTS FROM FRONT END URL ONCE HOSTED
app.use(cors());
app.use(bodyParser.json());

app.use('/careers', careers);
app.use('/users', users);

app.use('/', (req: Request, res: Response): void => {
  res.json('Hello, World!');
});

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

export default app;
