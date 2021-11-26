const Book = require('../models/book');

/**
 * retrieve all books service
 * @return {Promise<*>}
 */
const getBooks = async () => {
  return Book.findAll();
};

/**
 * retrieve book service
 * @param bookId
 * @return {Promise<*>}
 */
const getBook = async (bookId) => {
  return Book.findOne({
    where: {bookId},
  });
};

/**
 * save book service
 * @param book
 * @return {Promise<book>}
 */
const saveBook = async (book) => {
  if (book.bookId!==undefined && book.bookId!==null) {
    // get the book passing primary key for check book availability
    const alreadySavedBook = await getBook(Number(book.bookId));
    if (alreadySavedBook===null) return Book.create(book);
    else throw new Error('Book is already exist');
  } else return Book.create(book);
};

/**
 * update book service
 * @param bookId
 * @param book
 * @return {Promise<*>}
 */
const updateBook = async (bookId, book) => {
  return Book.update(book, {
    where: {
      bookId,
    },
  });
};

/**
 * delete book service
 * @param bookId
 * @return {Promise<*>}
 */
const deleteBook = async (bookId) => {
  if (bookId!==undefined && bookId!==null) {
    // get the book passing primary key
    const savedBook = await getBook(Number(bookId));
    if (savedBook!==null) return savedBook.destroy();
    else throw new Error('Book is not found');
  } else throw new Error('Book is not found');
};

module.exports = {
  getBooks,
  getBook,
  saveBook,
  updateBook,
  deleteBook,
};
