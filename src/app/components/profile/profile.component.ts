import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userService = inject(UserService)

  username = ''
  email = ''
  role = false

  async ngOnInit() {
    try {
      await this.userService.getUserID(); 
      const data = await this.userService.getUserInfo();
      
      if (data) {
        this.username = data.name;
        this.email = data.email;
        this.role = Boolean(data.role);
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  }
  

}
