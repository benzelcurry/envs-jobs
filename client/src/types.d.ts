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
  bio_quote?: string;
  bio_photo?: string;
  job_photo?: string;
}