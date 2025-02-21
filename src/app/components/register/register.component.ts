import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SupabaseService } from '../../auth/supabase.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  supabaseService = inject(SupabaseService);

  message = '';

  async onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
  
    this.authService.register(email, username, password).subscribe(async (response) => {
      if (response.error) {
        this.message = response.error.message;
      } else {

        const user = await this.supabaseService.getCurrentUser();
        
        if (user) {
          const userid = user.id; 
  
          const userData = {
            userid,
            email,
            username,
          };
  
          await this.supabaseService.insertUser(userData);
        }
  
        this.router.navigateByUrl('/');
      }
    });
  
    form.reset();
  }
  
}
