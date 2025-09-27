import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';



export interface Tutorial {
  id?: string;
  title: string;
  description: string;
  category?: string;
  published?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private baseUrl = 'http://localhost:8080/api/tutorial';

  constructor(private http: HttpClient) {}

  // getTutorials(query?: string): Observable<Tutorial[]> {
  //   const url = query ? `${this.baseUrl}` : this.baseUrl;
  //   return this.http.get<Tutorial[]>(url);
  // }
  getTutorials() {
    return this.http.get<Tutorial[]>(this.baseUrl);
  }






  createTutorial(data:any) {
    return this.http.post(this.baseUrl, data);
  }

  updateTutorial(id: string, data:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data );
  }

  deleteTutorial(id: string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


  getPublished() {
    return this.http.get<Tutorial[]>(`${this.baseUrl}/published`);

  }

  getDraft() {
    return this.http.get<Tutorial[]>(`${this.baseUrl}/draft`);
  }

  filterByCategory(category: string) {
    debugger;
    return this.http.get<Tutorial[]>(`${this.baseUrl}/category/${category}`);
  }

  searching(query: string) {
    debugger;
      return this.http.get<Tutorial[]>(`${this.baseUrl}/search/${query}`);
  }
}
