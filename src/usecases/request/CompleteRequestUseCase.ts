import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { RequestStatus } from '../../domain/request/RequestStatus';

interface CompleteRequestInput {
  id: string;
  solution: string;
}

class CompleteRequestUseCase
  implements IRequestUseCase<CompleteRequestInput, void>
{
  constructor(private requestRepository: IRequestRepository) {}

  async execute(input: CompleteRequestInput): Promise<void> {
    const request = await this.requestRepository.findById(input.id);

    if (!request) throw new Error('Запрос не найден');
    if (request.status !== RequestStatus.IN_PROGRESS)
      throw new Error('Запрос не выполняется');

    request.status = RequestStatus.COMPLETED;
    request.solution = input.solution;
    await this.requestRepository.update(input.id, request);
  }
}

export { CompleteRequestUseCase };
