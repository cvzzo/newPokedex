import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PokemonComponent } from '../../pokemon/pokemon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moves',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule],
  templateUrl: './moves.component.html',
  styleUrl: './moves.component.scss'
})
export class MovesComponent {
  readonly dialogRef = inject(MatDialogRef<PokemonComponent>);
    readonly data = inject<any>(MAT_DIALOG_DATA);


    onNoClick(): void {
      this.dialogRef.close();
    }
}
