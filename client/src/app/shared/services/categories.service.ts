import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('/api/category')
  }

  geById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }
}
