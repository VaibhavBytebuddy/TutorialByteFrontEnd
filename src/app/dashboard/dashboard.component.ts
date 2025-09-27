import { Component, ViewChild } from '@angular/core';
import { CreateTutorialComponent } from '../create-tutorial/create-tutorial.component';
import { MyTutorialsComponent } from '../my-tutorials/my-tutorials.component';
import {Tutorial, TutorialService} from '../services/tutorial.service';
import {AuthService} from '../services/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    MyTutorialsComponent,
    CreateTutorialComponent,
    NgIf,
    RouterLink,
    NgClass,
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sidebarOpen=false;
  searchTerm: string='';


  search() {
console.log("Search String  ",this.searchTerm);
    this.listComp.search(this.searchTerm);
    this.searchTerm=" ";
  }
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



  toggleSidebar() {
this.sidebarOpen=!this.sidebarOpen;
  }
}
