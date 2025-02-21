import { CreateRequestUseCase } from '../../../../src/usecases/request/CreateRequestUseCase';
import { IRequestRepository } from '../../../../src/domain/request/IRequestRepository';
import { Request } from '../../../../src/domain/request/Request';

describe('CreateRequestUseCase', () => {
  let requestRepository: IRequestRepository;
  let createRequestUseCase: CreateRequestUseCase;

  beforeEach(() => {
    requestRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
    };
    createRequestUseCase = new CreateRequestUseCase(requestRepository);
  });

  it("должен создать новое обращение со статусом 'NEW'", async () => {
    const newRequest: Request = {
      subject: 'Ошибка',
      message: 'Описание ошибки',
      status: 'NEW',
      id: '123',
      solution: undefined,
      cancelReason: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (requestRepository.create as jest.Mock).mockResolvedValue(newRequest);

    const result = await createRequestUseCase.execute({
      subject: 'Ошибка',
      message: 'Описание ошибки',
    });

    expect(result).toEqual(newRequest);
    expect(requestRepository.create).toHaveBeenCalledWith({
      subject: 'Ошибка',
      message: 'Описание ошибки',
      status: 'NEW',
    });
  });
});
