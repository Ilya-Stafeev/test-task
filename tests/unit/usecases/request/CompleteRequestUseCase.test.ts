import { CompleteRequestUseCase } from '../../../../src/usecases/request/CompleteRequestUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { RequestStatus } from '../../../../src/domain/request/RequestStatus';
import { Request } from '../../../../src/domain/request/Request';

describe('CompleteRequestUseCase', () => {
  let requestRepository: IRequestRepository;
  let completeRequestUseCase: CompleteRequestUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    completeRequestUseCase = new CompleteRequestUseCase(requestRepository);
  });

  it('должен завершить обращение с решением', async () => {
    const existingRequest: Request = {
      id: '123',
      subject: 'Ошибка',
      message: 'Описание ошибки',
      status: RequestStatus.IN_PROGRESS,
      solution: undefined,
      cancelReason: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const solution = 'Решение проблемы';

    (requestRepository.findById as jest.Mock).mockResolvedValue(
      existingRequest
    );
    (requestRepository.update as jest.Mock).mockResolvedValue({
      ...existingRequest,
      status: RequestStatus.COMPLETED,
      solution,
    });

    await completeRequestUseCase.execute({ id: '123', solution });

    expect(requestRepository.update).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        status: RequestStatus.COMPLETED,
        solution,
      })
    );
  });
});
