import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {AuthGuard} from './auth.guard';
import {UsersComponent} from './users/users.component';

export const routes: Routes = [
  {path:'',component:LandingpageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'users',component:UsersComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },



];
