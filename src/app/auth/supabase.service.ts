import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async insertUser(data: any) {
    const { data: insertedData, error } = await this.supabase
      .from('users')
      .insert([{
        userid: data.userid,
        email: data.email,
        name: data.username,
      }]);

    if (error) {
      console.error('Errore nell\'inserimento dei dati:', error.message);
      return null;
    }

    return insertedData;
  }


  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    
    if (error) {
      console.error('Errore nel recupero dell\'utente autenticato:', error.message);
      return null;
    }
    
    return data.user; 
  }

  
}