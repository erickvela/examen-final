import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { getRickAndMortyResource } from '../common/rick-and-morty-api';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Promise<unknown> {
    return getRickAndMortyResource(this.httpService, '/character');
  }

  findOne(id: string): Promise<unknown> {
    return getRickAndMortyResource(
      this.httpService,
      `/character/${encodeURIComponent(id)}`,
    );
  }
}
