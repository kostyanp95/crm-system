import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { PositionService } from "../../../shared/services/position.service";
import { Position } from "../../../shared/models/position.model";
import { ModalMaterialInstance, MaterializeService } from "../../../shared/services/materialize.service";

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
  loading: boolean = false
  modal: ModalMaterialInstance

  constructor(private positionService: PositionService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId)
      .subscribe(positions => this.positions = positions)
    this.loading = false
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position): void {
    this.modal.open()
  }

  onAddPosition(): void {
    this.modal.open()
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  onCancel(): void {
    this.modal.close()
  }
}
