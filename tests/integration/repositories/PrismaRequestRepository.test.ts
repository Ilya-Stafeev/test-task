import { PrismaRequestRepository } from '../../../src/infra/repositories/PrismaRequestRepository';
import { PrismaClient, RequestStatus } from '@prisma/client';
import { server } from '../../../src/app/server';

const prisma = new PrismaClient();
const repository = new PrismaRequestRepository();

describe('PrismaRequestRepository', () => {
  beforeAll(async () => {
    await prisma.request.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('должен создавать новое обращение', async () => {
    const requestData = {
      subject: 'Ошибка',
      message: 'Описание ошибки',
      status: RequestStatus.NEW,
    };

    const request = await repository.create(requestData);

    expect(request).toHaveProperty('id');
    expect(request.subject).toBe('Ошибка');
    expect(request.status).toBe(RequestStatus.NEW);
  });
});
