// User schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Don't rely on `unique: true` for validation; do additional verification check
// when handling User creation via controller
const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 20 },
  family_name: { type: String, required: true, minLength: 1, maxLength: 20 },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 16,
    unique: true
  },
  password: { type: String, minLength: 6, maxLength: 100, required: true },
  is_admin: { type: Boolean, default: false },
  attributes: [{ type: String }]
});

module.exports = mongoose.model('User', UserSchema);
