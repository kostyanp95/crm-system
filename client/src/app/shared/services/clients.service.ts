import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }

  getById(clientId: string | Client): Observable<Client> {
    const body = {}
    if (typeof clientId === 'string') {
      body['clientId'] = clientId
    } else {
      body['clientId'] = clientId['_id']
    }
    return this.http.post<Client>('/api/client', {clientId})
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>('/api/client', client)
  }

  update(client: Client): Observable<Client> {
    return this.http.patch<Client>(`/api/client/${client._id}`, client)
  }

  getList(params: any = {}): Observable<Array<Client>> {
    return this.http.get<Array<Client>>('api/client', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}
