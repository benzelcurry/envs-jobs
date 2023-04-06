import request from 'supertest';
import app from '../src/app';

// TODO: Add more tests!

describe('GET /', () => {
  test('It should respond with a 200 status code',  (done) => {
    request(app).get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /careers', () => {
  test('It should respond with a 200 status code', (done) => {
    request(app).get('/careers')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});