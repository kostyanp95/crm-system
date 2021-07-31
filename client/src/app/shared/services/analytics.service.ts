import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { OverviewModel } from '../models/overview.model';
import { AnalyticsModel } from '../models/analytics.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
    this.checkService()
  }

  getOverview(): Observable<OverviewModel> {
    return this.http.get<OverviewModel>('/api/analytics/overview')
  }

  getAnalytics(): Observable<AnalyticsModel> {
    return this.http.get<AnalyticsModel>('/api/analytics/analytics')
  }

  checkService(): void {
    interval(1000 * 60 * 5)
      .pipe(
        tap(() => this.http.get<any>('/api/analytics/analytics/check').subscribe())
      )
      .subscribe()
  }
}
