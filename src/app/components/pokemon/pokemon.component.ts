import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserService } from '../../auth/user.service';


@Component({
  selector: 'app-generation',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {
  
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  userService = inject(UserService);
  parametro: any;
  pokemon:any;
  maxStatValue=255
  isFavorite = false
  favoritePokemon = []

  ngOnInit() {
    this.userService.getUserID()
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemonInfo(this.parametro).subscribe(resp =>{
      this.pokemon = resp
    })

    this.userService.favorite.forEach(e => {
      if(e == this.parametro){
        this.isFavorite = true
      }
    });
    
  }

  setFavorite(){
    this.isFavorite = true
    this.userService.addFavorite(this.parametro)
  }
  removeFavorite(){
    this.isFavorite = false
    this.userService.removeFavorite(this.parametro)
  }
}
