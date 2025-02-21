import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { RequestStatus } from '../../domain/request/RequestStatus';
import { Request } from '../../domain/request/Request';

interface TakeRequestInput {
  id: string;
}

class TakeRequestUseCase implements IRequestUseCase<TakeRequestInput, Request> {
  constructor(private requestRepository: IRequestRepository) {}

  async execute(input: TakeRequestInput): Promise<Request> {
    const request = await this.requestRepository.findById(input.id);

    if (!request) throw new Error('Запрос не найден');
    if (request.status !== RequestStatus.NEW)
      throw new Error('Запрос не является новым');

    request.status = RequestStatus.IN_PROGRESS;
    const updatedRequest = await this.requestRepository.update(
      input.id,
      request
    );

    if (!updatedRequest) throw new Error('Не удалось обновить запрос');
    return updatedRequest;
  }
}

export { TakeRequestUseCase };
