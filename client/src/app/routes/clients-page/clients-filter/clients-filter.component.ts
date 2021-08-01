import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Filter } from '../../../shared/models/filter.model';
import { MaterializeDatepicker, MaterializeService } from '../../../shared/services/materialize.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients-filter',
  templateUrl: './clients-filter.component.html',
  styleUrls: ['./clients-filter.component.scss']
})
export class ClientsFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() applyFilter = new EventEmitter<Filter>()
  @ViewChild('dateRegister') dateRegisterRef: ElementRef

  dateRegister: MaterializeDatepicker
  form: FormGroup
  isValid = true
  filter: Filter;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initFilters()
  }

  initFilters(): void {
    this.form = this.fb.group({
      order: null,
      name: null,
      registrationDate: null
    })
  }

  submitFilter(): void {
    this.filter = this.form.getRawValue()
    if (this.dateRegister.date) {
      this.filter.start = this.dateRegister.date
    }

    const removeEmpty = (obj) =>
      Object.entries(obj).forEach(([key, val]) => {
        if (val == null) {
          delete obj[key]
        }
      })

    removeEmpty(this.filter)

    this.applyFilter.emit(this.filter)
  }

  ngAfterViewInit(): void {
    this.dateRegister = MaterializeService.iniDatepicker(this.dateRegisterRef, null)
  }

  ngOnDestroy(): void {
    this.dateRegister.destroy()
  }

  resetFilters(): void {
    this.form.reset()
    this.filter = {}
    this.applyFilter.emit(this.filter)
  }
}
