export interface User {
  username: string;
  first_name: string;
  family_name: string;
  is_admin: boolean;
  attributes: string[];
}

export interface Career {
  title: string;
  description: string;
  attributes: string[];
  certifications?: string[];
  bio_quote?: string;
  bio_photo?: string;
  job_photo?: string;
}

export interface Question {
  _id: string;
  prompt: string;
  answer_one: [string, string];
  answer_two: [string, string];
}