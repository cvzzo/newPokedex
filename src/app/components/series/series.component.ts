import { Component, inject, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series',
  imports: [CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit{
  all: any[] = [];
  series: string[] = []

  
  cardService = inject(CardsService)
  
  ngOnInit(): void {
    this.cardService.getSeries().subscribe(resp => {
      this.all = resp.data;
      this.series = [...new Set(this.all.map(e => e.series))]; 
    });
  }
}
