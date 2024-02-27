const request = require('supertest');
const assert = require('assert');
const app = require('../../server');
const pool = require('../connection/connection');

let authToken;

describe('Pruebas de API', () => {
  before(async () => {
    // Configuración inicial (obtener token, etc.)
    const response = await request(app)
      .post('/usuario/singin')
      .send({ email: 'user1@gmail.com', password: '123' })
      .expect(200);

    authToken = response.body.token;
  });

  it('Debería obtener un token en POST /singin', async () => {
    const response = await request(app)
      .post('/usuario/singin')
      .send({ email: 'user1@gmail.com', password: '123' })
      .expect(200);

    authToken = response.body.token;
    assert.ok(authToken, 'Se espera que la respuesta contenga un token');
  });

  it('Debería obtener datos con token en GET /', async () => {
    const response = await request(app)
      .get('/usuario')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    assert.strictEqual(response.status, 200, 'Se espera un código de estado 200');
    assert.ok(response.body, 'Se espera que la respuesta contenga datos');
  });

  after((done) => {
    pool.end((error) => {
      if (error) {
        console.error('Error al cerrar el pool de conexiones:', error);
      } else {
        console.log('Pool de conexiones cerrado exitosamente.');
      }
      done();
    });
  });
});
