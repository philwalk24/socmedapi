const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Define the schema for reactions
const reactionSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generate a default ObjectId
    },
    body: {
      type: String,
      required: true, // The reaction body is required
      maxlength: 280, // Maximum length of 280 characters for the reaction body
    },
    author: {
      type: String,
      required: true, // The author of the reaction is required
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
      get: timestamp => dateFormat(timestamp), // Format the timestamp using the dateFormat utility
    },
  },
  {
    // Schema options
    toJSON: {
      getters: true, // Include getters when converting to JSON
    },
    _id: false, // Exclude the _id field from the schema (Mongoose defaults to false for _id)
  }
);

module.exports = reactionSchema; // Export the reactionSchema