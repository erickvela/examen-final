import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { getRickAndMortyResource } from '../common/rick-and-morty-api';

interface Episode {
  characters: string[];
  [key: string]: unknown;
}

@Injectable()
export class EpisodesService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Promise<unknown> {
    return getRickAndMortyResource(this.httpService, '/episode');
  }

  async findOne(id: string): Promise<unknown> {
    const episode = await getRickAndMortyResource<Episode>(
      this.httpService,
      `/episode/${encodeURIComponent(id)}`,
    );
    const characters = await Promise.all(
      episode.characters.map((url) =>
        getRickAndMortyResource<Record<string, unknown>>(
          this.httpService,
          url,
        ),
      ),
    );

    return { ...episode, characters };
  }
}
