import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

@Injectable()
export class AuthService {
  private readonly testUser: User = {
    id: 1,
    email: 'test@rickandmorty.com',
    name: 'Rick Sanchez',
  };
  private readonly testPassword = '123456';

  login(credentials: LoginCredentials): LoginResponse {
    if (
      credentials?.email !== this.testUser.email ||
      credentials?.password !== this.testPassword
    ) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return {
      access_token: `mock-${randomUUID()}`,
      user: this.testUser,
    };
  }
}
