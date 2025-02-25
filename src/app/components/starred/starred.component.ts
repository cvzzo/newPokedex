import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
@Component({
  selector: 'app-starred',
  imports: [CommonModule, PokemonCardComponent],
  templateUrl: './starred.component.html',
  styleUrl: './starred.component.scss'
})
export class StarredComponent implements OnInit {

  pokemonService = inject(PokemonService)
  favoritePokemon: any[] = []
  userService = inject(UserService)

  ngOnInit(): void {
    this.userService.getUserID()

    this.userService.favorite.forEach((pokemon) => {
      this.pokemonService.getPokemonInfo(pokemon).subscribe((data) => {
        this.favoritePokemon.push(data)
      })
    })    
  }

}
