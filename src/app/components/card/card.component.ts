import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  route = inject(ActivatedRoute);
  cardService = inject(CardsService)
  parametro: any;
  card: any

  ngOnInit() {
    this.parametro = this.route.snapshot.paramMap.get('id');
    this.cardService.getCard(this.parametro).subscribe(e => {
      this.card = e.data
    })
  }
}
