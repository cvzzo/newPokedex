import { Routes } from '@angular/router';
import { GenerationsComponent } from './components/generations/generations.component';
import { GenerationComponent } from './components/generation/generation.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StarredComponent } from './components/starred/starred.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { SeriesComponent } from './components/series/series.component';
import { SerieComponent } from './components/serie/serie.component';
import { SetComponent } from './components/set/set.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'generations', component: GenerationsComponent},
    { path: 'generation/:id', component: GenerationComponent},
    { path: 'pokemon/:id', component: PokemonComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'search', component: SearchComponent},
    { path: 'favourites', component: StarredComponent, canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'accountList', component: AccountListComponent, canActivate: [AdminGuard]},
    { path: 'series', component: SeriesComponent},
    { path: 'serie/:id', component: SerieComponent},
    { path: 'set/:id', component: SetComponent},
    { path: 'card/:id', component: CardComponent},
    { path: '**', redirectTo: '' }
];
