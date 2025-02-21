import { RequestStatus } from '@prisma/client';
import { IRepository } from '../../core/IRepository';
import { Request } from './Request';

export interface IRequestRepository extends IRepository<Request> {
  findByStatus(status: RequestStatus): Promise<Request[]>;
}
