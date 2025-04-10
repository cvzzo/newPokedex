import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../auth/user.service';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {MatChipsModule} from '@angular/material/chips';
import pokemon from '../../types/pokemon'
import { MatDialog } from '@angular/material/dialog';
import { MovesComponent } from '../dialogs/moves/moves.component';

@Component({
  selector: 'app-generation',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, PokemonCardComponent, MatChipsModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  userService = inject(UserService);
  readonly dialog = inject(MatDialog);





  parametro: any;
  pokemon: pokemon;
  pokemonSpecies: any;
  isFavorite = false;
  favoritePokemon = [];
  isShiny = false;
  evoUrl: any[] = [];
  evo: any[] = [];
  formUrl: any = []
  form: any = [];
  movesList: any = []

  ngOnInit() {
    this.userService.getUserID();
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('id');
      this.loadPokemon();
    });

    this.userService.favorite.forEach(e => {
      if (e == this.parametro) {
        this.isFavorite = true;
      }
    });

    
  }

  loadPokemon() {
    this.pokemonService.getPokemonInfo(this.parametro).subscribe(resp => {
      this.evoUrl = [];
      this.evo = [];
      this.formUrl = [];
      this.form = [];
      this.movesList = []
      this.pokemon = resp;
      this.pokemonService.getByUrl(resp.species.url).subscribe(resp => {
        this.pokemonService.getByUrl(resp.evolution_chain.url).subscribe(resp => {
          if (resp.chain.species) {
            this.evoUrl.push(resp.chain.species.url);
            if (resp.chain.evolves_to.length > 0) {
              this.evoUrl.push(resp.chain.evolves_to[0].species.url)
              if (resp.chain.evolves_to[0].evolves_to.length > 0) {
                this.evoUrl.push(resp.chain.evolves_to[0].evolves_to[0].species.url)
              }
            }
          }
          this.evoUrl.forEach(e => {
            this.pokemonService.getByUrl(e).subscribe(resp => {
              this.pokemonService.getPokemonInfo(resp.id).subscribe(resp => {
                this.evo.push(resp);
              });
            });
          });
        });
      });
      this.pokemonService.getPokemonInfo(this.parametro).subscribe(resp => {
        this.pokemonService.getByUrl(resp.species.url).subscribe(resp => {
          this.pokemonSpecies = resp;
          resp.varieties.forEach((e: any) => {
            this.formUrl.push(e.pokemon.url)
          });
          this.formUrl.forEach((e: any) => {
            this.pokemonService.getByUrl(e).subscribe(resp => {
              this.form.push(resp);
            });
          });
        });
      });
      this.pokemon.moves.forEach((e:any) => {
        this.pokemonService.getByUrl(e.move.url).subscribe((resp: any)=>{
          this.movesList.push(resp)
        })
      })
    });
    
  }

  setFavorite() {
    this.isFavorite = true;
    this.userService.addFavorite(this.parametro);
  }

  removeFavorite() {
    this.isFavorite = false;
    this.userService.removeFavorite(this.parametro);
  }

  changeSprite() {
    this.isShiny = !this.isShiny;
  }

  openMove(id: string){
    console.log("mossa aperta")
    this.pokemonService.getMove(id).subscribe((resp)=>{
      this.dialog.open(MovesComponent,
        {data:{resp: resp}}
      )
    })
  }

  getTypeClass(move: any): string {
      return `movetype-${move.type.name.toLowerCase()}`;
  }
}