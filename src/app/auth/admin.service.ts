import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  persone = {}
  
  async getUsers() {

    
  }
  
}
