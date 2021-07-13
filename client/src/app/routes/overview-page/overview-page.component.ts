import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewModel } from '../../shared/models/overview.model';
import { MaterializeInstance, MaterializeService } from '../../shared/services/materialize.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef

  tapTarget: MaterializeInstance
  data$: Observable<OverviewModel>
  yesterday: Date = new Date()

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterializeService.iniTapTarget(this.tapTargetRef)
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy()
  }

  openInfo(): void {
    this.tapTarget.open()
  }
}
