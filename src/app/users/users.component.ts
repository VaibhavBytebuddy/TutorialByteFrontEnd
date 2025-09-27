import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Tutorial} from '../services/tutorial.service';
import {User} from '../services/auth.service';

@Component({
  selector: 'app-users',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users:User[]=[];



}
