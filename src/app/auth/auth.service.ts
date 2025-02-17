import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() { }


  register(email:string, password: string): Observable<AuthResponse>{
    const promise = this.supabase.auth.signUp({
      email,
      password
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
