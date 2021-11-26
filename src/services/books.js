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
  if (book.bookId!==undefined && book.bookId!==null) {
    const alreadySavedBook = await getBook(Number(book.bookId));
    if (alreadySavedBook===null) {
      return Book.create(book);
    } else {
      throw new Error('Book is already exist');
    }
  } else {
    return Book.create(book);
  }
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
  if (bookId!==undefined && bookId!==null) {
    const savedBook = await getBook(Number(bookId));
    if (savedBook!==null) {
      return savedBook.destroy();
    } else {
      throw new Error('Book is not found');
    }
  }
};

module.exports = {
  getBooks,
  getBook,
  saveBook,
  updateBook, // User Story 4 - Update Book By Id Solution
  deleteBook,
};
