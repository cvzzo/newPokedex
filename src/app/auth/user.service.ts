import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authService = inject(AuthService)
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  uID=''

  id = 0
  name=''
  email=''
  admin=false
  favorite: string[] = []


  
  getUserID(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService?.supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user?.id) {
          this.uID = session.user.id;
          resolve(this.uID);
        } else {
          console.error('Errore: Nessun utente autenticato');
          reject('Nessun utente autenticato');
        }
      });
    });
  }
  




  async getUserInfo() {

    if (!this.uID || !this.uID.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      console.error('uID non valido:', this.uID)
      return null
    }

    const { data, error } = await this.supabase
      .from('users')  
      .select('role, name, email, id, favorite')
      .eq('userid', this.uID)
      .single() 

    if (error) {
      console.error('Errore nel recupero delle informazioni utente:', error)
      return null
    }

    this.name = data.name;
    this.email = data.email;
    this.admin = Boolean(data.role);
    this.id = data.id;
    this.favorite = data.favorite;
    return data
  }
  

  getAdmin(){
    return this.admin
  }


  addFavorite(id: any){
    this.favorite.push(id)
    this.updateFavorite()
  }

  async updateFavorite() {
    try {
      const { data, error } = await this.supabase
        .from('users')
        .update({ favorite: this.favorite })
        .eq('userid', this.uID)
        .select(); // Seleziona i dati aggiornati
  
      if (error) {
        throw new Error(error.message); // Gestisce l'errore se c'è
      }
  
      console.log('Favorite updated:', data); // Dovresti vedere i dati aggiornati
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  }
  
  
  

  removeFavorite(id: string) {
    console.log('ID to remove:', id);
    console.log('Current favorites:', this.favorite);
    
    // Rimuovi l'ID
    const updatedFavorites = this.favorite.filter(e => String(e) !== id);
  
    // Verifica la rimozione
    console.log('Updated favorites:', updatedFavorites);
  
    if (updatedFavorites.length === this.favorite.length) {
      console.error('ID not found or not removed');
    }
  
    this.favorite = updatedFavorites; // Assicurati che l'array venga aggiornato
  
    this.updateFavorite();
  }
  
  
}
