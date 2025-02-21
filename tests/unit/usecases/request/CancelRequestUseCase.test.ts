import { CancelRequestUseCase } from '../../../../src/usecases/request/CancelRequestUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { RequestStatus } from '../../../../src/domain/request/RequestStatus';
import { Request } from '../../../../src/domain/request/Request';

describe('CancelRequestUseCase', () => {
  let requestRepository: IRequestRepository;
  let cancelRequestUseCase: CancelRequestUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    cancelRequestUseCase = new CancelRequestUseCase(requestRepository);
  });

  it('должен отменить обращение с причиной', async () => {
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

    const cancelReason = 'Больше не нужно';

    (requestRepository.findById as jest.Mock).mockResolvedValue(
      existingRequest
    );
    (requestRepository.update as jest.Mock).mockResolvedValue({
      ...existingRequest,
      status: RequestStatus.CANCELED,
      cancelReason,
    });

    await cancelRequestUseCase.execute({ id: '123', cancelReason });

    expect(requestRepository.update).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        status: RequestStatus.CANCELED,
        cancelReason,
        id: '123',
        subject: 'Ошибка',
        message: 'Описание ошибки',
        solution: undefined,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });
});
