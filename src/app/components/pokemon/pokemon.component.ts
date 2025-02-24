import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-generation',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  parametro: any;
  pokemon:any;
  maxStatValue=255
  isFavorite = false


  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonInfo(this.parametro).subscribe(resp =>{
      this.pokemon = resp
    })
  }

  setFavorite(){
    this.isFavorite = true
  }
  removeFavorite(){
    this.isFavorite = false
  }
}
