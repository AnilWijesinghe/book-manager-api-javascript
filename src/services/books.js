const Book = require('../models/book');

const getBooks = async () => {
  return Book.findAll();
};

const getBook = async (bookId) => {
  return Book.findOne({
    where: {bookId},
  });
};

const saveBook = async (book) => {
  return Book.create(book);
};

// User Story 4 - Update Book By Id Solution
const updateBook = async (bookId, book) => {
  return Book.update(book, {
    where: {
      bookId,
    },
  });
};

const deleteBook = async (bookId) => {
  return Book.delete({
    where: {bookId},
  });
};

module.exports = {
  getBooks,
  getBook,
  saveBook,
  updateBook, // User Story 4 - Update Book By Id Solution
  deleteBook,
};
