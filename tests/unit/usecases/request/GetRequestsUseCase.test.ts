import { GetRequestsUseCase } from '../../../../src/usecases/request/GetRequestsUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { Request } from '../../../../src/domain/request/Request';

describe('GetRequestsUseCase', () => {
  let requestRepository: IRequestRepository;
  let getRequestsUseCase: GetRequestsUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    getRequestsUseCase = new GetRequestsUseCase(requestRepository);
  });

  it('должен вернуть все обращения', async () => {
    const requests: Request[] = [
      {
        id: '1',
        subject: 'Ошибка 1',
        message: 'Описание 1',
        status: 'NEW',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        subject: 'Ошибка 2',
        message: 'Описание 2',
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    (requestRepository.findAll as jest.Mock).mockResolvedValue(requests);

    const result = await getRequestsUseCase.execute({});

    expect(result).toEqual(requests);
  });
});
