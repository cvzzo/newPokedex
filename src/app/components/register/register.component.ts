import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

message ='';

  onSubmit(form: NgForm){
    const email = form.value.email
    const password = form.value.password
    const username = form.value.username
    
    this.authService.register(email, username, password).subscribe((e)=>{
      if (e.error){
        this.message = e.error.message
      }else{
        this.router.navigateByUrl('/')
      }
    })

    form.reset()
  }

}
