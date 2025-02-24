import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.scss'
})
export class GenerationComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  parametro: any;
  pokemonList: any = [];
  pokemonInfo: any = [];

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    
    this.pokemonService.getGeneration(this.parametro).subscribe(resp => {
      this.pokemonList = resp.pokemon_species;

      const requests = this.pokemonList.map((e: any) => this.pokemonService.getPokemon(e.name));

      forkJoin(requests).subscribe((responses:any) => {
        this.pokemonInfo = responses.sort((a: any, b: any) => a.order - b.order);
      });
    });
  }
}
