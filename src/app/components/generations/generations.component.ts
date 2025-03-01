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
