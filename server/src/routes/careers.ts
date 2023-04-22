import express, { RequestHandler } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

import {
  career_list,
  add_career,
  update_career
} from '../controllers/careerController';

import checkAdmin from '../middleware/checkAdmin';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Configure multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'IMAGES/envs'
    };
  }
});

// Set up Multer middleware
const upload = multer({ storage });

// Returns list of careers on GET
router.get('/', career_list);

// Adds a new career on POST
router.post('/', upload.single('bio_photo'), checkAdmin, add_career);

// Updates a career on PUT
router.put('/', checkAdmin, update_career);

export default router;
