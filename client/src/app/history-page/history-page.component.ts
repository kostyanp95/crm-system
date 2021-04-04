import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MaterializeInstance, MaterializeService } from "../shared/services/materialize.service";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterializeInstance
  isFilterVisible: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterializeService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
  }

}
