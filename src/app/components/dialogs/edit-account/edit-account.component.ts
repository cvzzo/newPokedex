import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { validate as isUUID } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

import { DialogData } from '../../account-list/account-list.component';
import { AdminService } from '../../../auth/admin.service';


@Component({
  selector: 'app-edit-account',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton, MatRadioModule],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent {

  readonly dialogRef = inject(MatDialogRef<EditAccountComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  adminService= inject(AdminService)
  true = true
  false = false

  onNoClick(): void {
    this.dialogRef.close();
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(false, Validators.required)
    });
  }


  onSubmit() {
    this.adminService.updateUserList(this.myForm.value.name, this.myForm.value.email, this.myForm.value.role, this.data.id, this.data.userid)
    console.log('Form values:', this.myForm.value);
    this.dialogRef.close();
  }

  eliminaUtente(id: string, userId: string) {
    console.log('Elimina utente con id:', id);

    if (!isUUID(userId)) {
      console.error('Errore: userId non è un UUID valido:', userId);
      return;
    }
    this.adminService.deleteUser(Number(id), userId as `${string}-${string}-${string}-${string}-${string}`);
    this.dialogRef.close();

  }

}
