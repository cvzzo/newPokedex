import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import pokemon from '../../types/pokemon';
import pokemonSpecies from '../../types/pokemon_species';
import generation from '../../types/generation';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.scss'
})
export class GenerationComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  parametro: any;
  genInfo: any;
  pokemonList: any = [];
  pokemonInfo: any = [];
  pokemonInfoSorted: any = [];

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    
    this.pokemonService.getGeneration(this.parametro).subscribe(resp => {
      this.genInfo = resp;
      this.pokemonList = resp.pokemon_species;

      const pokemonRequests = this.pokemonList.map((e: any) => this.pokemonService.getPokemon(e.url));

      forkJoin(pokemonRequests).subscribe((pokemonData:any) => {
        const pokemonInfoRequests = pokemonData.map((pokemon:any) => this.pokemonService.getPokemonInfo(pokemon.id));

        forkJoin(pokemonInfoRequests).subscribe(infoData => {
          this.pokemonInfo = infoData;
          this.pokemonInfoSorted = [...this.pokemonInfo].sort((a, b) => a.id - b.id);
        });
      });
    });
  }
}
