const {bookService} = require('../services');

/**
 * retrieve all books controller
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const getBooks = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.json(books).status(200);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

/**
 * retrieve a book controller
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const getBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await bookService.getBook(Number(bookId));
    if (book) res.json(book).status(200);
    else res.status(404).json('Not found');
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

/**
 * save book controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const saveBook = async (req, res) => {
  const bookToBeSaved = req.body;
  try {
    const book = await bookService.saveBook(bookToBeSaved);
    res.status(201).json(book);
  } catch (error) {
    if (error.message==='Book is already exist') res.status(409).json({message: error.message});
    else res.status(400).json({message: error.message});
  }
};

/**
 * update book details controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateBook = async (req, res) => {
  try {
    const bookUpdateData = req.body;
    const bookId = req.params.bookId;
    const book = await bookService.updateBook(bookId, bookUpdateData);
    res.status(204).json(book);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

/**
 * delete book operation
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    await bookService.deleteBook(Number(bookId));
    res.json({message: 'Successfully deleted'}).status(200);
  } catch (error) {
    if (error.message==='Book is not found') res.status(404).json({message: error.message});
    else res.status(400).json({message: error.message});
  }
};

module.exports = {
  getBooks,
  getBook,
  saveBook,
  updateBook, // User Story 4 - Update Book By Id Solution
  deleteBook,
};
