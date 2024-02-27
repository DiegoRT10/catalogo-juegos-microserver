const request = require('supertest');
const assert = require('assert');
const app = require('../../server');
const pool = require('../connection/connection');


describe('Endpoint /games', () => {
  it('Debería obtener datos de juegos en GET /games', async () => {
    const response = await request(app)
      .get('/catalogo/game')
      .expect(200);

    assert.strictEqual(response.status, 200, 'Se espera un código de estado 200');
    assert.ok(response.body, 'Se espera que la respuesta contenga datos de juegos');
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
