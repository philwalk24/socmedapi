const { Thought, User } = require('../models');

const thoughtController = {
  // Create a new thought
  async createThought(req, res) {
    try {
      // Create a new thought document based on the request body
      const dbThoughtData = await Thought.create(req.body);

      // Update the user's data by adding the new thought's ID to their thoughts array
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId }, // Find the user by their ID
        { $push: { thoughts: dbThoughtData._id } }, // Add the thought's ID to the user's thoughts array
        { new: true } // Return the updated user data
      );

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      // Return a success message in the response
      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get all thoughts
  async getThoughts(req, res) {
    try {
      // Find and retrieve all thought documents, sorted by createdAt in descending order
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });

      // Return the retrieved thought data in the response
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get a single thought by its ID
  async getThought(req, res) {
    try {
      // Find a single thought by its ID
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

      // If no thought with the provided ID is found, return a 404 response
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // Return the retrieved thought data in the response
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      // Update a thought by its ID with the provided request body
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $set: req.body }, // Update the thought with the request body data
        { runValidators: true, new: true } // Validate and return the updated thought
      );

      // If no thought with the provided ID is found, return a 404 response
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // Return the updated thought data in the response
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      // Delete a thought by its ID
      const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      // If no thought with the provided ID is found, return a 404 response
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // Remove the thought ID from the user's thoughts array
      const dbUserData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId }, // Find the user with the thought ID in their thoughts array
        { $pull: { thoughts: req.params.thoughtId } }, // Remove the thought ID from the array
        { new: true } // Return the updated user data
      );

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      // Return a success message in the response
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      // Add a reaction to a thought by its ID
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $addToSet: { reactions: req.body } }, // Add the reaction to the thought's reactions array
        { runValidators: true, new: true } // Validate and return the updated thought
      );

      // If no thought with the provided ID is found, return a 404 response
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // Return the updated thought data in the response
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      // Remove a reaction from a thought by its ID and reaction ID
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find the thought by its ID
        { $pull: { reactions: { _id: req.params._id } } }, // Remove the reaction from the thought's reactions array
        { runValidators: true, new: true } // Validate and return the updated thought
      );

      // If no thought with the provided ID is found, return a 404 response
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      // Return the updated thought data in the response
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;