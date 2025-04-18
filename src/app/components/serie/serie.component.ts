import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../../services/cards.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-serie',
  imports: [CommonModule, RouterLink],
  templateUrl: './serie.component.html',
  styleUrl: './serie.component.scss'
})
export class SerieComponent implements OnInit {

  route = inject(ActivatedRoute);
  cardService = inject(CardsService)
  parametro: any;
  sets: any[] = []

  ngOnInit() {
      this.parametro = this.route.snapshot.paramMap.get('id');
      this.cardService.getSeries().subscribe(e=>{
        e.data.forEach((element:any) => {
          if(element.series === this.parametro){
            this.sets.push(element)
          }
        });
        this.sets.reverse()
      })
    }
}
