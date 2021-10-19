import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ProfileUserController } from './controllers/ProfileUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';

const routes = Router();
//OAUTH
routes.post('/authenticate', new AuthenticateUserController().handle);
//MESSAGE
routes.post('/messages', ensureAuthenticated, new CreateMessageController().handle);
//LAST MESSAGE3
routes.post('/messages/last3', new GetLast3MessagesController().handle);
//PROFILE
routes.get('/profile', ensureAuthenticated, new ProfileUserController().handle);

export { routes };
