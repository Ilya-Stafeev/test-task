import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { RequestStatus } from '../../domain/request/RequestStatus';

class CancelAllInProgressUseCase implements IRequestUseCase<void, void> {
  constructor(private requestRepository: IRequestRepository) {}

  async execute(): Promise<void> {
    const inProgressRequests = await this.requestRepository.findByStatus(
      RequestStatus.IN_PROGRESS
    );

    for (const request of inProgressRequests) {
      request.status = RequestStatus.CANCELED;
      request.cancelReason = 'Отменено автоматически';
      await this.requestRepository.update(request.id, request);
    }
  }
}

export { CancelAllInProgressUseCase };
