import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { Character, PaginatedResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<PaginatedResponse<Character>> {
    return this.http.get<PaginatedResponse<Character>>(
      `${API_BASE_URL}/characters`,
    );
  }

  getCharacterById(id: string | number): Observable<Character> {
    return this.http.get<Character>(
      `${API_BASE_URL}/characters/${encodeURIComponent(id)}`,
    );
  }
}
