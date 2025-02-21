import { PrismaClient, RequestStatus, Prisma } from '@prisma/client';
import { Request } from '../../domain/request/Request';
import { IRequestRepository } from '../../domain/request/IRequestRepository';

const prisma = new PrismaClient();

export class PrismaRequestRepository implements IRequestRepository {
  async create(data: Prisma.RequestCreateInput) {
    return prisma.request.create({ data });
  }

  async update(id: string, data: Partial<Request>): Promise<Request | null> {
    return prisma.request.update({ where: { id }, data });
  }

  async findById(id: string): Promise<Request | null> {
    return prisma.request.findUnique({ where: { id } });
  }

  async findAll(): Promise<Request[]> {
    return prisma.request.findMany();
  }

  async findByStatus(status: RequestStatus): Promise<Request[]> {
    return prisma.request.findMany({ where: { status } });
  }
}
