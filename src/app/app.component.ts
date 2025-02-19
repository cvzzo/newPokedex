import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { SupabaseService } from './auth/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  private readonly platform = inject(PLATFORM_ID);
  authService: AuthService | null = null;
  supabaseService: SupabaseService | null = null
  router: Router | null = null

  constructor() {
    if (isPlatformBrowser(this.platform)) {
      this.authService = inject(AuthService);
      this.supabaseService = inject(SupabaseService)
      this.router = inject(Router)
    }
  }
  
  userID:any

  async ngOnInit() {
    this.authService?.supabase.auth.onAuthStateChange((e, s) => {
        if (e === 'SIGNED_IN') {
            this.authService?.currentUser.set({
                email: s?.user.email!,
                username: s?.user.identities?.at(0)?.identity_data?.['username']
            })
            this.userID = s?.user.id;
            this.authService!.isLogged = true
        } else if (e === 'SIGNED_OUT') {
          this.authService!.isLogged = false
            this.authService?.currentUser.set(null);
        }
    })
}

  

  logout(){
    this.authService?.logout()
    this.authService!.isLogged = false
    this.router?.navigateByUrl('/');
  }
}