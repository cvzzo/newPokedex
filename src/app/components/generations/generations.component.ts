import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-generations',
  imports: [CommonModule],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.scss'
})
export class GenerationsComponent implements OnInit {

  private readonly platform = inject(PLATFORM_ID);
  pokemonService: PokemonService | null = null;

constructor() {
    if (isPlatformBrowser(this.platform)) {
      this.pokemonService = inject(PokemonService)
    }
  }

  generations:any

  ngOnInit(){
    this.pokemonService?.getGeneration().subscribe({
      next:(resp) => {
        this.generations = resp.results
      },
      error: (error) => {
        console.log('Errore nella richiesta ' , error)
      }
    })
  }

}
