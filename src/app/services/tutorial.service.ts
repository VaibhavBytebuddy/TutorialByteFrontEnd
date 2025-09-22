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

  private baseUrl = 'http://localhost:8080/api/tutorial'; // change to your backend URL

  constructor(private http: HttpClient) {}

  getTutorials(query?: string): Observable<Tutorial[]> {
    const url = query ? `${this.baseUrl}` : this.baseUrl;
    return this.http.get<Tutorial[]>(url);
  }



  createTutorial(data: Partial<Tutorial>): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateTutorial(id: string, data: Partial<Tutorial>): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data );
  }

  deleteTutorial(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }


}
