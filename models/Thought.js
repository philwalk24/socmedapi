const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Import the reactionSchema
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
  
    text: { // The text of the thought
      type: String,
      required: 'A thought is required!', // A thought is required
      minlength: 1, // Minimum length of 1 character
      maxlength: 280 // Maximum length of 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
      get: timestamp => dateFormat(timestamp) // Format the timestamp using the dateFormat utility
    },
    author: { // The author of the thought
      type: String,
      required: true // Author is required
    },
    reactions: [reactionSchema] // An array of reactions associated with the thought, using the reactionSchema
  },
  {
    toJSON: {
      getters: true // Include getters when converting to JSON
    },
    _id: false // Exclude the _id field from the schema (Mongoose defaults to false for _id)
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Define a virtual property to get the count of reactions associated with the thought
});

const Thought = model('Thought', thoughtSchema); // Create the Thought model using the thoughtSchema

module.exports = Thought; // Export the Thought model