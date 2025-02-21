import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<{ email:string, username: string } | null>(null)
  isLogged = false

  constructor() { }

  isAuthenticated(){
    return this.isLogged
  }

  register(email:string, username:string, password: string): Observable<AuthResponse>{
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          username,
        }
      }
    });
    this.isLogged = true
    return from(promise);
  }


  login(email: string, password: string){
    const promise= this.supabase.auth.signInWithPassword({
      email,
      password
    })
    this.isLogged = true
    return from(promise)
  }

  logout(){
    this.isLogged = false
    this.supabase.auth.signOut()
  }

  getID(){
    this.supabase.auth.getUser('id')
  }

  
}
