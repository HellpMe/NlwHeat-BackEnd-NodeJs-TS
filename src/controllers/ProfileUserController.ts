import { ProfileUserService } from '../services/ProfileUserService';
import { Request, Response } from 'express';

export class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new ProfileUserService();

    const result = service.execute(user_id);

    return response.json(result);
  }
}
