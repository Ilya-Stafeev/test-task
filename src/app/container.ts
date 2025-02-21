import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaRequestRepository } from '../infra/repositories/PrismaRequestRepository';
import { CreateRequestUseCase } from '../usecases/request/CreateRequestUseCase';
import { TakeRequestUseCase } from '../usecases/request/TakeRequestUseCase';
import { CompleteRequestUseCase } from '../usecases/request/CompleteRequestUseCase';
import { CancelRequestUseCase } from '../usecases/request/CancelRequestUseCase';
import { GetRequestsUseCase } from '../usecases/request/GetRequestsUseCase';
import { CancelAllInProgressUseCase } from '../usecases/request/CancelAllInProgressUseCase';
import { RequestController } from '../interfaces/controllers/RequestController';

container.register('RequestRepository', { useClass: PrismaRequestRepository });

container.register('CreateRequestUseCase', {
  useFactory: (c) => new CreateRequestUseCase(c.resolve('RequestRepository')),
});
container.register('TakeRequestUseCase', {
  useFactory: (c) => new TakeRequestUseCase(c.resolve('RequestRepository')),
});
container.register('CompleteRequestUseCase', {
  useFactory: (c) => new CompleteRequestUseCase(c.resolve('RequestRepository')),
});
container.register('CancelRequestUseCase', {
  useFactory: (c) => new CancelRequestUseCase(c.resolve('RequestRepository')),
});
container.register('GetRequestsUseCase', {
  useFactory: (c) => new GetRequestsUseCase(c.resolve('RequestRepository')),
});
container.register('CancelAllInProgressUseCase', {
  useFactory: (c) =>
    new CancelAllInProgressUseCase(c.resolve('RequestRepository')),
});

container.register('RequestController', {
  useFactory: (c) =>
    new RequestController(
      c.resolve('CreateRequestUseCase'),
      c.resolve('TakeRequestUseCase'),
      c.resolve('CompleteRequestUseCase'),
      c.resolve('CancelRequestUseCase'),
      c.resolve('GetRequestsUseCase'),
      c.resolve('CancelAllInProgressUseCase')
    ),
});

export { container };
