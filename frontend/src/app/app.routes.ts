import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { BrowseComponent } from './pages/browse.component';
import { CharacterDetailComponent } from './pages/character-detail.component';
import { EpisodeDetailComponent } from './pages/episode-detail.component';
import { LoginComponent } from './pages/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent, canActivate: [authGuard] },
  {
    path: 'episode/:id',
    component: EpisodeDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
