import { Component, inject, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterLink],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit {
  all: any[] = [];
  series: any[] = [];
  others: any[] = [];

  cardService = inject(CardsService);

  ngOnInit(): void {
    this.cardService.getSeries().subscribe(resp => {
      this.all = resp.data;
  
      // Estrai le serie uniche
      const seenSeries = new Set();
      this.series = [];
  
      this.all.forEach(element => {
        if (!seenSeries.has(element.series)) {
          seenSeries.add(element.series);
          this.series.push(element);
        }
      });
  
      this.series.reverse();
  
      this.others = this.all.filter(element => !seenSeries.has(element.series));
    });
  }
  
}
