const express = require('express');
const {booksController} = require('../controllers');

const router = new express.Router();
router.get('/books', booksController.getBooks);
router.get('/books/:bookId', booksController.getBook);
router.post('/books', booksController.saveBook);
router.put('/books/:bookId', booksController.updateBook);
router.delete('/books/:bookId', booksController.deleteBook);

module.exports = router;
