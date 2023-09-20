const { User, Thought } = require('../models');

const userController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get all users (excluding the '__v' field)
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().select('-__v');
      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Get a single user by their ID, including their friends and thoughts
  async getUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user by their ID
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a user by their ID and associated thoughts
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Get IDs of user's thoughts and delete them all
      await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });

      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      // If no user with the provided ID is found, return a 404 response
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;