import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending: boolean = true
  subscription: Subscription

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    this.subscription = this.analyticsService.getAnalytics()
      .subscribe((analytics) => {
        this.average = analytics.average

        this.pending = false
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
