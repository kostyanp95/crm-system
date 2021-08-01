import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Filter } from '../../../shared/models/filter.model';
import { MaterializeDatepicker, MaterializeService } from '../../../shared/services/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef

  start: MaterializeDatepicker
  end: MaterializeDatepicker
  order: number

  isValid = true
  filter: Filter = {}

  submitFilter(): void {

    if (this.order) {
      this.filter.order = this.order
    }

    if (this.start.date) {
      this.filter.start = this.start.date
    }

    if (this.end.date) {
      this.filter.end = this.end.date
    }

    this.onFilter.emit(this.filter)
  }

  resetFilters(): void {
    this.filter = {}
    this.onFilter.emit(this.filter)
  }

  ngAfterViewInit(): void {
    this.start = MaterializeService.iniDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterializeService.iniDatepicker(this.endRef, this.validate.bind(this))
  }

  validate(): void {
    if (!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }

    this.isValid = this.start.date < this.end.date

  }

  ngOnDestroy(): void {
    this.start?.destroy()
    this.end?.destroy()
  }
}
