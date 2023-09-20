const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// Route for getting all thoughts and creating a new thought
router.route('/')
  .get(getThoughts) // GET /api/thoughts - Get all thoughts
  .post(createThought); // POST /api/thoughts - Create a new thought

// Route for getting a single thought, updating, or deleting a thought by its ID
router.route('/:thoughtId')
  .get(getThought) // GET /api/thoughts/:thoughtId - Get a single thought by its ID
  .put(updateThought) // PUT /api/thoughts/:thoughtId - Update a thought by its ID
  .delete(deleteThought); // DELETE /api/thoughts/:thoughtId - Delete a thought by its ID

// Route for adding a reaction to a thought by its ID
router.route('/:thoughtId/reactions')
  .post(addReaction); // POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought by its ID

// Route for removing a reaction from a thought by its ID and reaction ID
router.route('/:thoughtId/reactions/:_id')
  .delete(removeReaction); // DELETE /api/thoughts/:thoughtId/reactions/:_id - Remove a reaction from a thought by its ID and reaction ID

module.exports = router;

