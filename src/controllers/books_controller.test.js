const {bookService} = require('../services');
jest.mock('../services/books');


const request = require('supertest');
const app = require('../app');

const dummyBookData = [
  {
    bookId: 1,
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
  },
  {
    bookId: 2,
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
  },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/v1/books endpoint', () => {
  test('status code successfully 200', async () => {
    // Act
    const res = await request(app).get('/api/v1/books');

    // Assert
    expect(res.statusCode).toEqual(200);
  });

  test('books successfully returned as empty array when no data', async () => {
    // Arrange
    bookService.getBooks = jest.fn().mockReturnValue([]);
    // Act
    const res = await request(app).get('/api/v1/books');

    // Assert
    expect(res.body).toEqual([]);
  });

  test('books successfully returned as array of books', async () => {
    // Arrange
    bookService.getBooks = jest.fn().mockReturnValue(dummyBookData);
    // Act
    const res = await request(app).get('/api/v1/books');

    // Assert
    expect(res.body).toEqual(dummyBookData);
  });
});

describe('GET /api/v1/books/{bookId} endpoint', () => {
  test('status code successfully 200 for a book that is found', async () => {
    // Arrange
    bookService.getBook = jest.fn().mockReturnValue(dummyBookData[1]);
    // Act
    const res = await request(app).get('/api/v1/books/2');

    // Assert
    expect(res.statusCode).toEqual(200);
  });

  test('status code successfully 404 for a book that is not found', async () => {
    // Arrange
    bookService.getBook = jest.fn().mockReturnValue(undefined);
    // Act
    const res = await request(app).get('/api/v1/books/77');

    // Assert
    expect(res.statusCode).toEqual(404);
  });

  test('controller successfully returns book object as JSON', async () => {
    // Arrange
    bookService.getBook = jest.fn().mockReturnValue(dummyBookData[1]);
    // Act
    const res = await request(app).get('/api/v1/books/2');

    // Assert
    expect(res.body).toEqual(dummyBookData[1]);
  });
});

describe('POST /api/v1/books endpoint', () => {
  test('status code successfully 201 for saving a valid book', async () => {
    // Act
    const res = await request(app).post('/api/v1/books')
        .send({bookId: 3, title: 'Fantastic Mr. Fox', author: 'Roald Dahl'});

    // Assert
    expect(res.statusCode).toEqual(201);
  });

  test('status code 400 when saving ill formatted JSON', async () => {
    // Arrange - enforce exception thrown
    bookService.saveBook = jest.fn().mockImplementation(() => {
      throw new Error('Error saving book');
    });
    // Act
    const res = await request(app).post('/api/v1/books')
        .send({title: 'Fantastic Mr. Fox', author: 'Roald Dahl'}); // No bookId

    // Assert
    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /api/v1/books/{bookId} endpoint', () => {
  test('status code successfully 404 for a book that is not found to delete', async () => {
    // Arrange
    bookService.deleteBook = jest.fn().mockReturnValue(undefined);
    // Act
    const res = await request(app).delete('/api/v1/books/10');

    // Assert
    expect(res.statusCode).toEqual(404);
  });


  test('status code successfully 200 for a book that is found and deleted', async () => {
    // Arrange
    bookService.deleteBook = jest.fn().mockReturnValue(dummyBookData[1]);
    // Act
    const res = await request(app).delete('/api/v1/books/2');

    // Assert
    expect(res.statusCode).toEqual(200);
  });
});
