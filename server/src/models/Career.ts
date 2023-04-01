// Career schema

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// This schema is subject to change. Potential additions:
// * Job listings (pulled from LinkedIn or Indeed API if available?)
// * Helpful certificates/degrees
// * Pay range (only add if can pull from a 3rd party API that updates; might not be a DB call)
const CareerSchema = new Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 100 },
  description: { type: String, required: true, minLength: 2 },
  attributes: [{ type: String }]
});

module.exports = mongoose.model('Career', CareerSchema);
