import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../auth/user.service';

@Component({
  selector: 'app-starred',
  imports: [],
  templateUrl: './starred.component.html',
  styleUrl: './starred.component.scss'
})
export class StarredComponent implements OnInit {

  userService = inject(UserService)

  ngOnInit(): void {
    this.userService.getUserID()
  }

}
