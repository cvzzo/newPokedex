import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../auth/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-list',
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {

  adminService = inject(AdminService)

  persone:any

  async ngOnInit(){
    const data = await this.adminService.getUsers()
    this.persone = data
  }

}
