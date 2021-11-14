import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/order.model';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { Client } from '../../../shared/models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../shared/services/clients.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() clients: Array<Client>
  @ViewChild('clientModal') clientModalRef: ElementRef
  @ViewChild('orderModal') orderModalRef: ElementRef

  selectedClient: Client
  selectedOrder: Order
  selectedOrders: Array<Order>
  clientForm: FormGroup
  orderForm: FormGroup
  clientModal: MaterializeInstance
  editClientModal = false
  ordersClientModal = false
  subscription: Subscription
  orderModal: MaterializeInstance
  orderStatuses = ['Принят', 'В работе', 'Завершен']
  orderStatus: MaterializeInstance
  @ViewChild('orderStatus') selectRef: ElementRef

  constructor(private fb: FormBuilder,
              private clientsService: ClientsService,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    MaterializeService.updateTextFields()
  }

  initClientForm(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      lastname: '',
      phone: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      comment: this.selectedOrder?.comment,
      status: this.selectedOrder.status
    })
  }

  ngAfterViewInit(): void {
    this.clientModal = MaterializeService.initModal(this.clientModalRef)
    this.orderModal = MaterializeService.initModal(this.orderModalRef)
  }

  computeOrderPrice(order: Order): number {
    return order?.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  computeSumOrdersPrices(orders: Array<Order>): number {
    let total = 0
    orders?.forEach(order => {
      order?.list.forEach(sum => {
        total += (sum.quantity * sum.cost)
      })
    })
    return total
  }

  openEditClientModal(client: Client): void {
    this.ordersClientModal = false
    this.editClientModal = true
    this.selectedClient = client
    this.initClientForm()
    this.clientModal.open()
    this.clientForm.patchValue(this.selectedClient)
    setTimeout(() => MaterializeService.updateTextFields(), .1)
  }

  openClientOrdersModal(client: Client): void {
    if (client.orders.length > 0) {
      this.editClientModal = false
      this.ordersClientModal = true
      this.selectedClient = client
      this.selectedOrders = client.orders
      this.clientModal.open()
    } else {
      MaterializeService.toast('У данного клиента еще нет заказов...')
    }
  }

  closeModals(): void {
    this.editClientModal = false
    this.ordersClientModal = false
    this.clientModal.close()
  }

  closeModal(): void {
    this.orderModal.close()
  }

  ngOnDestroy(): void {
    this.clientModal.destroy()
  }

  editClient(): void {
    const editedClient: Client = this.clientForm.getRawValue()
    editedClient._id = this.selectedClient._id
    this.clientsService.update(editedClient)
      .subscribe()
  }

  openClientOrder(order: Order): void {
    this.selectedOrder = order
    order.client = this.selectedClient
    this.orderModal.open()
    this.initOrderForm()
    setTimeout(() => {
      this.orderStatus = MaterializeService.initSelect(this.selectRef)
      MaterializeService.updateTextFields()
    }, .1)
  }

  onSubmit(): void {
    const formData = this.clientForm.getRawValue()
    const updatedOrder = Object.assign(this.selectedOrder, formData)
    this.subscription = this.ordersService.update(updatedOrder)
      .subscribe(() => {
          MaterializeService.toast(`Информация о заказе №${updatedOrder.order} обновлена!`)
          this.orderModal.close()
        },
        error => MaterializeService.toast(error)
      )
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }
}
