import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending = true
  subscription: Subscription

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgba(255, 99 ,132)'
    }
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgba(54, 162 ,235)'
    }

    this.subscription = this.analyticsService.getAnalytics()
      .subscribe((analytics) => {
        this.average = analytics.average

        gainConfig.labels = analytics.chart.map(item => item.label)
        gainConfig.data = analytics.chart.map(item => item.gain)

        orderConfig.labels = analytics.chart.map(item => item.label)
        orderConfig.data = analytics.chart.map(item => item.order)

        const gainContext = this.gainRef.nativeElement.getContext('2d')
        const orderContext = this.orderRef.nativeElement.getContext('2d')
        gainContext.canvas.height = '250px'
        orderContext.canvas.height = '250px'

        new Chart(gainContext, createChartConfig(gainConfig))
        new Chart(orderContext, createChartConfig(orderConfig))

        this.pending = false
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}

function createChartConfig({labels, data, label, color}): any {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
