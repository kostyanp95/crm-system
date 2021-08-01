import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/order.model';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Array<Order>
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('orderStatus') selectRef: ElementRef

  selectedOrder: Order
  modal: MaterializeInstance
  orderStatus: MaterializeInstance
  orderStatuses = ['Принят', 'В работе', 'Завершен']
  form: FormGroup;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private ordersService: OrdersService) {
  }

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
    this.form = this.fb.group({
      comment: this.selectedOrder?.comment,
      status: this.selectedOrder.status
    })
    setTimeout(() => {
      this.orderStatus = MaterializeService.initSelect(this.selectRef)
      MaterializeService.updateTextFields()
    }, .1)
  }

  closeModal(): void {
    this.modal.close()
  }

  onSubmit(): void {
    const formData = this.form.getRawValue()
    const updatedOrder = Object.assign(this.selectedOrder, formData)
    this.subscription = this.ordersService.update(updatedOrder)
      .subscribe(() => {
          MaterializeService.toast(`Информация о заказе №${updatedOrder.order} обновлена!`)
          this.modal.close()
        },
        error => MaterializeService.toast(error)
      )
  }

  ngOnDestroy(): void {
    this.modal?.destroy()
    this.subscription?.unsubscribe()
  }
}
