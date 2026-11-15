import { Controller, Get, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';

@Controller('api/episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(): Promise<unknown> {
    return this.episodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.episodesService.findOne(id);
  }
}
