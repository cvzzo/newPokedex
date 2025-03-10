import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set',
  imports: [CommonModule, RouterLink],
  templateUrl: './set.component.html',
  styleUrl: './set.component.scss'
})
export class SetComponent implements OnInit{

  route = inject(ActivatedRoute);
  cardService = inject(CardsService)
  parametro: any;
  cards: any[] = []

  ngOnInit() {
      this.parametro = this.route.snapshot.paramMap.get('id');
      this.cardService.getCards(this.parametro).subscribe(e=>{
        this.cards = e.data
        this.cards.sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
      })
    }
}
