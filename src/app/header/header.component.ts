import { Component } from '@angular/core';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  constructor(private router: Router) {
  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
