import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character, Episode } from '../models/models';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './episode-detail.component.html',
})
export class EpisodeDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly episodesService = inject(EpisodesService);

  episode: Episode | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'El episodio solicitado no es válido.';
      this.loading = false;
      return;
    }

    this.episodesService.getEpisodeById(id).subscribe({
      next: (episode) => {
        this.episode = episode;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el episodio.';
        this.loading = false;
      },
    });
  }

  isCharacter(value: string | Character): value is Character {
    return typeof value !== 'string';
  }

  getCoverCharacter(episode: Episode): Character | null {
    return (
      episode.characters.find(
        (character): character is Character => this.isCharacter(character),
      ) ?? null
    );
  }
}
