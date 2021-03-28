import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Position } from "../models/position.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  fetch(categoryId: string): Observable<Array<Position>> {
    return this.http.get<Array<Position>>(`/api/position/${categoryId}`)
  }
}
