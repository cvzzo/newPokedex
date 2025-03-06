import { Component, inject, OnInit, ChangeDetectionStrategy, signal, model } from '@angular/core';
import { AdminService } from '../../auth/admin.service';
import { CommonModule } from '@angular/common';
import { validate as isUUID } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditAccountComponent } from '../dialogs/edit-account/edit-account.component';
import { FormsModule } from '@angular/forms';


export interface DialogData {
  name: string;
  email: string;
  role: boolean
  id: string
  userid: string
}


@Component({
  selector: 'app-account-list',
  imports: [CommonModule, MatIconModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  adminService = inject(AdminService)

  persone: any

  async ngOnInit() {
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


  openDialog(persona:any): void {
    this.dialog.open(EditAccountComponent, {
      data: {name: persona.name, email: persona.email, role: persona.role, id: persona.id, userid: persona.userid},
    });
  }


}  