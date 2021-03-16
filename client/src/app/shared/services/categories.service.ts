import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private htpp: HttpClient) {
  }

  fetch(): Observable<Array<Category>> {
    return this.htpp.get<Array<Category>>('/api/category')
  }
}
