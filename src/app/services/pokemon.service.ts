import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  constructor(private http: HttpClient){}

  generations = 'https://pokeapi.co/api/v2/generation'

  getGeneration(url: any): Observable<any>{
    return this.http.get<any>(url)
  }

  getGenerations():Observable<any>{
    return this.http.get<any>(this.generations)
  }

  getPokemon(url: string): Observable<any>{
    return this.http.get<any>(url)
  }

  getPokemonInfo(id:string): Observable<any>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  getSpecies(url: string): Observable<any>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${url}`)
  }

  getByUrl(url: string): Observable<any>{
    return this.http.get(url)
  }

}
