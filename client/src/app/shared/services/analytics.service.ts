import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverviewModel } from '../models/overview.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getOverview(): Observable<OverviewModel> {
    return this.http.get<OverviewModel>('/api/analytics/overview')
  }
}
