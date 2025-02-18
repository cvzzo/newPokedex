import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<{ email:string, username: string } | null>(null)

  constructor() { }

  register(email:string, username:string, password: string): Observable<AuthResponse>{
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          username
        }
      }
    });
    return from(promise);
  }


  login(email: string, password: string){
    const promise= this.supabase.auth.signInWithPassword({
      email,
      password
    })
    return from(promise)
  }
}
