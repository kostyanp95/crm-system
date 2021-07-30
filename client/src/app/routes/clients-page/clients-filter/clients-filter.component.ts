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
    const filter: Filter = this.form.getRawValue()
    const result: Filter = {}

    if (this.dateRegister.date) {
      filter.start = this.dateRegister.date
    }

    Object.values(filter).forEach(key => {
      if (key !== null) {
        filter[key] = key
      }
    });

    this.applyFilter.emit(result)
  }

  ngAfterViewInit(): void {
    this.dateRegister = MaterializeService.iniDatepicker(this.dateRegisterRef, null)
  }

  ngOnDestroy(): void {
    this.dateRegister.destroy()
  }
}
