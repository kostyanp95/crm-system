import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/order.model';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Array<Order>
  @ViewChild('modal') modalRef: ElementRef

  selectedOrder: Order
  modal: MaterializeInstance

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  ngOnDestroy(): void {
    this.modal?.destroy()
  }

  closeModal(): void {
    this.modal.close()
  }
}
