import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Starter {
  name: string;
  image: string;
}

interface GenerationData {
  region: string;
  starters: Starter[];
}

@Component({
  selector: 'app-generations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.scss'
})
export class GenerationsComponent implements OnInit {

  private readonly platform = inject(PLATFORM_ID);
  pokemonService: PokemonService | null = null;

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      this.pokemonService = inject(PokemonService);
    }
  }

  generations:any

  ngOnInit(): void {
    this.pokemonService?.getGenerations().subscribe(resp=>{
      const data = resp.results
      this.generations = data
      console.log(this.generations)
    })
  }

  submit(coso: any){
    console.log(coso)
  }
  
}
