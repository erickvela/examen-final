import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/api.config';
import { Episode, PaginatedResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EpisodesService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<PaginatedResponse<Episode>> {
    return this.http.get<PaginatedResponse<Episode>>(
      `${API_BASE_URL}/episodes`,
    );
  }

  getEpisodeById(id: string | number): Observable<Episode> {
    return this.http.get<Episode>(
      `${API_BASE_URL}/episodes/${encodeURIComponent(id)}`,
    );
  }
}
