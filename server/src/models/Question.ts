// Question schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  prompt: {
    type: String,
    required: true,
    minLength: 2,
    unique: true
  },
  answer_one: { type: [String], required: true, minItems: 2, maxItems: 2 },
  answer_two: { type: [String], required: true, minItems: 2, maxItems: 2 }
});

export default mongoose.model('Question', QuestionSchema);
