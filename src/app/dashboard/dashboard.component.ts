import { Component, ViewChild } from '@angular/core';
import { CreateTutorialComponent } from '../create-tutorial/create-tutorial.component';
import { MyTutorialsComponent } from '../my-tutorials/my-tutorials.component';
import { Tutorial } from '../services/tutorial.service';
import {AuthService} from '../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MyTutorialsComponent,
    CreateTutorialComponent,
    NgIf
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('createComp') createComp!: CreateTutorialComponent;
  @ViewChild('listComp') listComp!: MyTutorialsComponent;

  openCreateModal() {
    this.createComp.openModal();
  }

  dropdownOpen = false;
  username = localStorage.getItem('username');
  email = localStorage.getItem('email');


  constructor(private authService: AuthService) {
  }


  onEditRequest(t: Tutorial) {
    this.createComp.openModal(t);
  }


  onSaved() {
    this.listComp.loadTutorials();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

  }

  logout() {
    this.authService.logout();
  }


}
