import { Request } from '../../domain/request/Request';
import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { RequestStatus } from '../../domain/request/RequestStatus';

interface CreateRequestInput {
  subject: string;
  message: string;
}

class CreateRequestUseCase
  implements IRequestUseCase<CreateRequestInput, Request>
{
  constructor(private requestRepository: IRequestRepository) {}

  async execute(input: CreateRequestInput): Promise<Request> {
    const request = new Request();
    request.subject = input.subject;
    request.message = input.message;
    request.status = RequestStatus.NEW;

    return this.requestRepository.create(request);
  }
}

export { CreateRequestUseCase };
