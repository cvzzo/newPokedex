import { Routes } from '@angular/router';
import { GenerationsComponent } from './components/generations/generations.component';
import { GenerationComponent } from './components/generation/generation.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StarredComponent } from './components/starred/starred.component';

export const routes: Routes = [
    { path: '', component: GenerationsComponent},
    { path: 'generation', component: GenerationComponent},
    { path: 'pokemon/:id', component: PokemonComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'favourites', component: StarredComponent}
];
