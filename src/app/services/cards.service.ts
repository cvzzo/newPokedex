import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {


  constructor(private http: HttpClient){}

  link = 'https://api.pokemontcg.io/v2/'

  getSeries():Observable<any>{
    return this.http.get(`${this.link}sets`)
  }

  getSerieLogo(name: string):Observable<any>{
    return this.http.get(`https://images.pokemontcg.io/${name}1/logo.png`)
  }
}
