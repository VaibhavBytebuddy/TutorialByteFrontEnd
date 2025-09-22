import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService:AuthService,private router:Router) {}

  onLogin()
  {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe((resp)=>{

          this.authService.setLoginStatus(true);
        this.router.navigate(['dashboard']);
        console.log(resp);

      },
        error => {
        this.errorMessage ='Invalid email or password';
        }
     );
  }

}
