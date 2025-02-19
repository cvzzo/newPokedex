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
      .select('role, name, email')
      .eq('userid', this.uID)
      .single() 

    if (error) {
      console.error('Errore nel recupero delle informazioni utente:', error)
      return null
    }
  
    return data
  }
}
