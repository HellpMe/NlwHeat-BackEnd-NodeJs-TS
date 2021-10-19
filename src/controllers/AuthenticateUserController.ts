import { AuthenticationUserService } from '../services/AuthenticateUserService';
import { Request, Response } from 'express';

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthenticationUserService();

    try {
      const result = await service.execute(code);
      return response.json(result);
    } catch (er) {
      return response.json({ error: er.message });
    }
  }
}
