import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { User } from '../models/models';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

const TOKEN_KEY = 'rick-and-morty.access-token';
const USER_KEY = 'rick-and-morty.user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(credentials: LoginCredentials): Observable<User> {
    return this.http
      .post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials)
      .pipe(
        tap(({ access_token, user }) => {
        localStorage.setItem(TOKEN_KEY, access_token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        }),
        map(({ user }) => user),
      );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user === null ? null : (JSON.parse(user) as User);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
