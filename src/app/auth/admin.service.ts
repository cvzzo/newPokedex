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
  };
}

