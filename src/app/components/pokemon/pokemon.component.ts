import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generation',
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  parametro: any;
  pokemon:any;

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonInfo(this.parametro).subscribe(resp =>{
      this.pokemon = resp
    })
  }
}
