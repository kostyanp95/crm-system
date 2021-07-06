import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  getList(params: any = {}): Observable<Array<Order>> {
    return this.http.get<Array<Order>>('api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}
