import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';
import { UUID } from 'node:crypto';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.serviceRoleKey, {
      auth: { persistSession: false }
    });
  }

  persone = {}

  async getUsers() {

    const { data, error } = await this.supabase
      .from('users')
      .select('role, name, email, id, userid')

    if (error) {
      console.error('Errore nel recupero delle informazioni utente:', error)
      return null
    }

    this.persone = data;
    console.log(data)
    return data
  }

  async deleteUser(id: number, userId: UUID) {
    const { data, error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Errore nel recupero delle informazioni utente:', error)
      return null
    } else {
      this.deleteAuthUser(userId)
      console.log('Utente eliminato con successo');
      window.location.reload();

    }

    return data
  }

  async deleteAuthUser(userId: string) {
    const { error } = await this.supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Errore durante l\'eliminazione:', error.message);
    } else {
      console.log('Utente eliminato con successo da auth.users');
    }
  }

  async updateUserList(name: string, email: string, role: boolean, id: string, userid: string) {
    try {
      const { error: authError } = await this.supabase.auth.admin.updateUserById(userid, { email });
  
      if (authError) {
        throw new Error(`Errore aggiornamento email su Auth: ${authError.message}`);
      }
  
      const { data, error } = await this.supabase
        .from('users')
        .update({ name: name, email: email, role: role })
        .eq('userid', userid)
        .select();
  
      if (error) {
        throw new Error(`Errore aggiornamento dati utente: ${error.message}`);
      }
  
      console.log('Dati aggiornati con successo:', data);
      return { success: true, data };
  
    } catch (error) {
      console.error('Errore nell\'aggiornamento dei dati:', error);
      return { success: false, message: error };
    }
  }
  
}

