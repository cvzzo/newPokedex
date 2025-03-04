import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import pokemon from '../../types/pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: any;

  getTypeClass(): string {
    if (this.pokemon?.types?.length === 2) {
      const type1 = this.pokemon?.types[0].type.name.toLowerCase();
      const type2 = this.pokemon?.types[1].type.name.toLowerCase();
      return `dual-type-${type1}-${type2}`;
    } else if (this.pokemon?.types?.length === 1) {
      return `type-${this.pokemon?.types[0].type.name.toLowerCase()}`;
    }
    return '';
  }


  
}
