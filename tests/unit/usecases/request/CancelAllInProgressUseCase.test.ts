import { CancelAllInProgressUseCase } from '../../../../src/usecases/request/CancelAllInProgressUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { RequestStatus } from '../../../../src/domain/request/RequestStatus';

describe('CancelAllInProgressUseCase', () => {
  let requestRepository: IRequestRepository;
  let cancelAllInProgressUseCase: CancelAllInProgressUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    cancelAllInProgressUseCase = new CancelAllInProgressUseCase(
      requestRepository
    );
  });

  it('должен отменить все обращения в статусе IN_PROGRESS', async () => {
    (requestRepository.findByStatus as jest.Mock).mockResolvedValue([]);
    await cancelAllInProgressUseCase.execute();
    expect(requestRepository.findByStatus).toHaveBeenCalledWith(
      RequestStatus.IN_PROGRESS
    );
  });
});
