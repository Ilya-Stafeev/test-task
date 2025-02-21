import request from 'supertest';
import { app } from '../../src/app/server';

describe('POST /requests', () => {
  it('должен создать новое обращение', async () => {
    const response = await request(app)
      .post('/requests')
      .send({ subject: 'Ошибка', message: 'Описание ошибки' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.status).toBe('NEW');
  });
});
