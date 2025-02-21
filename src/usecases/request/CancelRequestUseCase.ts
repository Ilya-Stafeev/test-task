import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { RequestStatus } from '../../domain/request/RequestStatus';

interface CancelRequestInput {
  id: string;
  cancelReason: string;
}

class CancelRequestUseCase
  implements IRequestUseCase<CancelRequestInput, void>
{
  constructor(private requestRepository: IRequestRepository) {}

  async execute(input: CancelRequestInput): Promise<void> {
    const request = await this.requestRepository.findById(input.id);

    if (!request) throw new Error('Запрос не найден');
    if (request.status !== RequestStatus.IN_PROGRESS) {
      throw new Error('Отменить можно только запрос в процессе выполнения');
    }

    request.status = RequestStatus.CANCELED;
    request.cancelReason = input.cancelReason;
    await this.requestRepository.update(input.id, request);
  }
}

export { CancelRequestUseCase };
