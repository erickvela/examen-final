import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  imports: [AuthModule, EpisodesModule, CharactersModule],
})
export class AppModule {}
