import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-generations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './generations.component.html',
  styleUrl: './generations.component.scss'
})

export class GenerationsComponent implements OnInit {

  starters: { [key: string]: { name: string, url: string }[] } = {
    'generation-i': [
      { name: 'bulbasaur', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
      { name: 'charmander', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
      { name: 'squirtle', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' }
    ],
    'generation-ii': [
      { name: 'chikorita', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png' },
      { name: 'cyndaquil', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png' },
      { name: 'totodile', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png' }
    ],
    'generation-iii': [
      { name: 'treecko', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png' },
      { name: 'torchic', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png' },
      { name: 'mudkip', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png' }
    ],
    'generation-iv': [
      { name: 'turtwig', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png' },
      { name: 'chimchar', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png' },
      { name: 'piplup', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png' }
    ],
    'generation-v': [
      { name: 'snivy', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png' },
      { name: 'tepig', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png' },
      { name: 'oshawott', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png' }
    ],
    'generation-vi': [
      { name: 'chespin', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png' },
      { name: 'fennekin', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png' },
      { name: 'froakie', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png' }
    ],
    'generation-vii': [
      { name: 'rowlet', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png' },
      { name: 'litten', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png' },
      { name: 'popplio', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png' }
    ],
    'generation-viii': [
      { name: 'grookey', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png' },
      { name: 'scorbunny', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png' },
      { name: 'sobble', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png' }
    ],
    'generation-ix': [
      { name: 'sprigatito', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png' },
      { name: 'fuecoco', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png' },
      { name: 'quaxly', url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png' }
    ],
  };

  private readonly platform = inject(PLATFORM_ID);
  pokemonService: PokemonService | null = null;

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      this.pokemonService = inject(PokemonService);
    }
  }

  generationsLink:any
  generations:any[] = []

  ngOnInit(): void {
    this.pokemonService?.getGenerations().subscribe((resp:any)=>{
      this.generationsLink = resp.results
      this.generationsLink.forEach((element:any) => {
        this.pokemonService?.getByUrl(element.url).subscribe((resp:any)=>{
          this.generations.push(resp)
        })
      })
  })
  }
}
