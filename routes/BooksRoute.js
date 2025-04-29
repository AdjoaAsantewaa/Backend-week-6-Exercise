 const express = require('express');
const { createBookDetails, retrieveBooks, updateBookDetails, deleteBookDetails } = require('../controllers/BooksController');
const router = express.Router();


router.post('/books', createBookDetails );
router.get('/books/:id?', retrieveBooks);
router.put('/books/:id', updateBookDetails);
router.delete('/books/:id', deleteBookDetails)

module.exports = router;
