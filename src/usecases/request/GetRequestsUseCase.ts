import { IRequestRepository } from '../../domain/request/IRequestRepository';
import { IRequestUseCase } from '../../domain/request/IRequestUseCase';
import { Request } from '../../domain/request/Request';

interface GetRequestsInput {
  dateFrom?: Date;
  dateTo?: Date;
}

class GetRequestsUseCase
  implements IRequestUseCase<GetRequestsInput, Request[]>
{
  constructor(private requestRepository: IRequestRepository) {}

  async execute(input: GetRequestsInput): Promise<Request[]> {
    const requests = await this.requestRepository.findAll();

    return requests.filter((request) => {
      const createdAt = new Date(request.createdAt);
      const from = input.dateFrom ? new Date(input.dateFrom) : null;
      const to = input.dateTo ? new Date(input.dateTo) : null;

      return (!from || createdAt >= from) && (!to || createdAt <= to);
    });
  }
}

export { GetRequestsUseCase };
