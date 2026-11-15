import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Character, Episode } from '../models/models';
import { AuthService } from '../services/auth.service';
import { CharactersService } from '../services/characters.service';
import { EpisodesService } from '../services/episodes.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './browse.component.html',
})
export class BrowseComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly episodesService = inject(EpisodesService);
  private readonly charactersService = inject(CharactersService);
  private readonly router = inject(Router);

  episodes: Episode[] = [];
  characters: Character[] = [];
  featuredCharacter: Character | null = null;
  episodesLoading = true;
  charactersLoading = true;
  episodesError = '';
  charactersError = '';

  ngOnInit(): void {
    this.episodesService.getAll().subscribe({
      next: (response) => {
        this.episodes = response.results;
        this.episodesLoading = false;
      },
      error: () => {
        this.episodesError = 'No se pudieron cargar los episodios.';
        this.episodesLoading = false;
      },
    });

    this.charactersService.getAll().subscribe({
      next: (response) => {
        this.characters = response.results;
        this.featuredCharacter =
          this.characters.find((character) => character.id === 1) ??
          this.characters[0] ??
          null;
        this.charactersLoading = false;
      },
      error: () => {
        this.charactersError = 'No se pudieron cargar los personajes.';
        this.charactersLoading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/login');
  }
}
