import { Request, Response } from 'express';
import { CreateRequestUseCase } from '../../usecases/request/CreateRequestUseCase';
import { TakeRequestUseCase } from '../../usecases/request/TakeRequestUseCase';
import { CompleteRequestUseCase } from '../../usecases/request/CompleteRequestUseCase';
import { CancelRequestUseCase } from '../../usecases/request/CancelRequestUseCase';
import { GetRequestsUseCase } from '../../usecases/request/GetRequestsUseCase';
import { CancelAllInProgressUseCase } from '../../usecases/request/CancelAllInProgressUseCase';

class RequestController {
  constructor(
    private createRequestUseCase: CreateRequestUseCase,
    private takeRequestUseCase: TakeRequestUseCase,
    private completeRequestUseCase: CompleteRequestUseCase,
    private cancelRequestUseCase: CancelRequestUseCase,
    private getRequestsUseCase: GetRequestsUseCase,
    private cancelAllInProgressUseCase: CancelAllInProgressUseCase
  ) {}

  async create(req: Request, res: Response) {
    const { subject, message } = req.body;
    try {
      const request = await this.createRequestUseCase.execute({
        subject,
        message,
      });
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async take(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.takeRequestUseCase.execute({ id });
      res.status(200).json({ message: 'Запрос взят в работу' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async complete(req: Request, res: Response) {
    const { id } = req.params;
    const { solution } = req.body;
    try {
      await this.completeRequestUseCase.execute({ id, solution });
      res.status(200).json({ message: 'Запрос выполнен' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async cancel(req: Request, res: Response) {
    const { id } = req.params;
    const { reason } = req.body;
    try {
      await this.cancelRequestUseCase.execute({ id, cancelReason: reason });
      res.status(200).json({ message: 'Запрос отменён' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    const { dateFrom, dateTo } = req.query;
    try {
      const requests = await this.getRequestsUseCase.execute({
        dateFrom: dateFrom ? new Date(dateFrom as string) : undefined,
        dateTo: dateTo ? new Date(dateTo as string) : undefined,
      });
      res.status(200).json(requests);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async cancelAllInProgress(req: Request, res: Response) {
    try {
      await this.cancelAllInProgressUseCase.execute();
      res.status(200).json({ message: 'Все незавершённые заявки отменены' });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export { RequestController };
