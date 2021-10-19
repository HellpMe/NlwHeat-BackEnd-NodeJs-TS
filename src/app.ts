import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

import { routes } from './routes';

const app = express();

app.use(cors());

const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`Success to user connected on socket ${socket.id}`);
});

app.use(express.json());

app.use(routes);

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}`
  );
});

app.get('/signin/callback', (request, response) => {
  const { code } = request.query;
  return response.json(code);
});

export { serverHTTP, io };
