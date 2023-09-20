const { Schema, model } = require('mongoose');

// Define the user schema
const userSchema = new Schema(
  {
    // Username field
    username: {
      type: String,
      required: true, // Username is required
      unique: true, // Username must be unique
      trim: true, // Trim leading and trailing whitespace from the username
    },

    // Email field
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
      match: [/.+@.+\..+/, 'Must match an email address!'], // Validate email format
    },

    // Array of references to thoughts
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the 'Thought' model for thoughts
      },
    ],

    // Array of references to friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model for friends
      },
    ],
  },
  {
    // Options
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
    },
    id: false, // Exclude the _id field from the schema (Mongoose defaults to false for _id)
  }
);

// Define a virtual property to get the count of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
