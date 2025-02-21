import { BaseEntity } from '../../core/BaseEntity';
import { RequestStatus } from '@prisma/client';

export class Request extends BaseEntity {
  subject!: string;
  message!: string;
  status!: RequestStatus;
  solution?: string | null;
  cancelReason?: string | null;
}
