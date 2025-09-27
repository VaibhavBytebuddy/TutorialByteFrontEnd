import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl='http://localhost:8080/api/auth';
  constructor(private http:HttpClient,private router:Router) { }
  private logged = false;

  signup(user: { username: string; email: string; password: string })
  {

    localStorage.setItem('username',user.username);
    localStorage.setItem('email',user.email);
    return this.http.post(`${this.baseUrl}/signup`,user);
  }

  login(credentials:{email: string; password: string })
  {
     this.logged = true;

     return this.http.post(`${this.baseUrl}/login`,credentials);

  }


  setLoginStatus(status: boolean) {
    localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
  }

  isLoggedIn(): boolean {

    return localStorage.getItem('isLoggedIn') === 'true';

  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

}
