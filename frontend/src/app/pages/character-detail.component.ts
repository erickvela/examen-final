import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character } from '../models/models';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly charactersService = inject(CharactersService);

  character: Character | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'El personaje solicitado no es válido.';
      this.loading = false;
      return;
    }

    this.charactersService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character = character;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el personaje.';
        this.loading = false;
      },
    });
  }

  getEpisodeId(episodeUrl: string): string {
    return episodeUrl.slice(episodeUrl.lastIndexOf('/') + 1);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Alive':
        return 'Vivo';
      case 'Dead':
        return 'Muerto';
      default:
        return 'Desconocido';
    }
  }
}
