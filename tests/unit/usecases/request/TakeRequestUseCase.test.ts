import { TakeRequestUseCase } from '../../../../src/usecases/request/TakeRequestUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { Request } from '../../../../src/domain/request/Request';
import { RequestStatus } from '../../../../src/domain/request/RequestStatus'; // Импорт

describe('TakeRequestUseCase', () => {
  let requestRepository: IRequestRepository;
  let takeRequestUseCase: TakeRequestUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    takeRequestUseCase = new TakeRequestUseCase(requestRepository);
  });

  it("должен изменить статус на 'IN_PROGRESS'", async () => {
    const existingRequest: Request = {
      id: '123',
      subject: 'Ошибка',
      message: 'Описание ошибки',
      status: RequestStatus.NEW,
      solution: undefined,
      cancelReason: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newStatus = RequestStatus.IN_PROGRESS;

    (requestRepository.findById as jest.Mock).mockResolvedValue(
      existingRequest
    );
    (requestRepository.update as jest.Mock).mockResolvedValue({
      ...existingRequest,
      status: newStatus,
    });

    await takeRequestUseCase.execute({ id: '123' });

    expect(requestRepository.update).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        status: newStatus,
      })
    );
  });
});
