import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {HeroComponent} from '../hero/hero.component';
import {CategoriesComponent} from '../categories/categories.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-landingpage',
  imports: [
    HeaderComponent,
    HeroComponent,
    CategoriesComponent,
    FooterComponent
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
