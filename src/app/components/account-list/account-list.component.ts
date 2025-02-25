import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../auth/admin.service';
import { CommonModule } from '@angular/common';
import { validate as isUUID } from 'uuid';

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

  eliminaUtente(id: string, userId: string) {
    console.log('Elimina utente con id:', id);
  
    if (!isUUID(userId)) {
      console.error('Errore: userId non è un UUID valido:', userId);
      return;
    }
    this.adminService.deleteUser(Number(id), userId as `${string}-${string}-${string}-${string}-${string}`);
  }


}
