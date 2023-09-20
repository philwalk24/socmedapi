const router = require('express').Router();
const {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  createUser,
  removeFriend,
  addFriend,
  
} = require('../../controllers/user-controller');

// Route for getting all users and creating a new user
router.route('/')
  .get(getUsers) // GET /api/users - Get all users
  .post(createUser); // POST /api/users - Create a new user

// Route for getting a single user, updating, or deleting a user by their ID
router.route('/:userId')
  .get(getUser) // GET /api/users/:userId - Get a single user by their ID
  .put(updateUser) // PUT /api/users/:userId - Update a user by their ID
  .delete(deleteUser); // DELETE /api/users/:userId - Delete a user by their ID

// Route for adding or removing a friend from a user's friend list
router.route('/:userId/friends/:friendId')
  .post(addFriend) // POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list
  .delete(removeFriend); // DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list
module.exports = router;