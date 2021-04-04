import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { PositionService } from "../../../shared/services/position.service";
import { Position } from "../../../shared/models/position.model";
import { MaterializeService, MaterializeInstance } from "../../../shared/services/materialize.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef
  @Input('categoryId') categoryId
  positions: Array<Position> = []
  positionId = null
  loading: boolean = false
  modal: MaterializeInstance
  form: FormGroup

  constructor(private positionService: PositionService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadingPositions()
    this.initForm()
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      cost: [null, [Validators.required, Validators.min(1)]]
    })
  }

  loadingPositions(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId)
        .subscribe(positions => {
          this.positions = positions
          this.cdr.markForCheck()
        })
    this.loading = false
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position): void {
    this.positionId = position._id
    this.modal.open()
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    MaterializeService.updateTextFields()
  }

  onAddPosition(): void {
    this.positionId = null
    this.modal.open()
    this.form.reset()
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  onCancel(): void {
    this.modal.close()
  }

  onSubmit(): void {
    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset()
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionService.update(newPosition)
          .subscribe(
            position => {
              const index = this.positions.findIndex(p => p._id === position._id)
              this.positions[index] = position
              this.cdr.markForCheck()
              MaterializeService.toast('Позиция изменена')
            },
            error => {
              MaterializeService.toast(error.error.message)
              console.log(error.error.message)
            },
            completed
          )
    } else {
      this.positionService.create(newPosition)
          .subscribe(
            position => {
              this.positions.push(position)
              this.cdr.markForCheck()
              MaterializeService.toast('Позиция создана')
            },
            error => {
              MaterializeService.toast(error.error.message)
              console.log(error.error.message)
            },
            completed
          )
    }
  }

  deletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decision) {
      this.positionService.delete(position)
          .subscribe(
            response => {
              const idx = this.positions.findIndex(p => p._id === position._id)
              this.positions.splice(idx, 1)
              this.cdr.markForCheck()
              MaterializeService.toast(response.message)
            },
            error => MaterializeService.toast(error.error.message)
          )
    }
  }
}
