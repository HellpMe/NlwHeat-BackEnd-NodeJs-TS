import prismaClient from '../prisma';
import { sign } from 'jsonwebtoken';
import axios from 'axios';

interface AccessTokenResponseInterface {
  access_token: string;
}

interface UserResponseInterface {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export class AuthenticationUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const { data: access_tokenResponse } =
      await axios.post<AccessTokenResponseInterface>(url, null, {
        params: {
          client_id: process.env.GITHUB_ID,
          client_secret: process.env.GITHUB_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      });

    const response = await axios.get<UserResponseInterface>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${access_tokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return { token, user };
  }
}
