import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username = '';
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private router: Router,private authService: AuthService) {}

  onSignup() {
    this.authService.signup({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: (resp) => {
          debugger;
          this.successMessage = 'Signup successful! Please login.';
          console.log(resp);
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: () => {

          this.errorMessage = 'Signup failed. Try again. Username or Email might be already present';

        }
      });
  }
}
