import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {HeroComponent} from './hero/hero.component';
import {CategoriesComponent} from './categories/categories.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, CategoriesComponent, FooterComponent, LoginComponent, SignupComponent, DashboardComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tutorialbyte';
}
