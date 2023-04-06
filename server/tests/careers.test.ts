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

describe('GET /users', () => {
  test('It should return with a 200 status code', (done) => {
    request(app).get('/users')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// NOTE: Having issues figuring out how to mock a database properly
// describe('POST /careers', () => {
//   const career = {
//     title: 'Another Career',
//     description: 'This is a career sent from the Jest suite',
//     attributes: ['test', 'jest', 'suite']
//   };

//   test('It should respond with a 200 status code when sending properly formatted object', async () => {
//     const response = await request(app).post('/careers').send(career);
//     expect(response.body).toBe(200);
//   });
// });