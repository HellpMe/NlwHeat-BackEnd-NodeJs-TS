import { GetLast3MessageService } from '../services/GetLast3MessagesService';
import { Request, Response } from 'express';

export class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3MessageService();

    const result = await service.execute();

    return response.json(result);
  }
}
