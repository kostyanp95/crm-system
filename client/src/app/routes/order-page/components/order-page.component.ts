import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  MaterializeDatepicker,
  MaterializeInstance,
  MaterializeService
} from '../../../shared/services/materialize.service';
import { ModalOrderService } from '../services/modal-order.service';
import { Order, OrderPosition, OrderStatus } from '../../../shared/models/order.model';
import { OrdersService } from '../../../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../shared/services/clients.service';
import { Client } from '../../../shared/models/client.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [ModalOrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('select') selectRef: ElementRef
  @ViewChild('dateRegister') dateRegisterRef: ElementRef
  order: Order = {} as Order
  client: Client
  modal: MaterializeInstance
  select: MaterializeInstance
  dateRegister: MaterializeDatepicker
  isRoot: boolean
  pending = false
  subscription: Subscription
  form: FormGroup
  isNewClient = false
  clients: Array<Client> = []
  selectedClientId = ''
  comment: string


  constructor(private router: Router,
              private fb: FormBuilder,
              public modalOrderService: ModalOrderService,
              private clientsService: ClientsService,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.initClientForm()
    this.isRootPath()
    this.getClientsList()
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isRootPath()
        }
      })
  }

  getClientsList(): void {
    this.clientsService.getList()
      .subscribe(clients => {
        this.clients = clients
      })
  }

  initClientForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      surname: null,
      phone: [null, Validators.required],
      comment: null
    })
  }

  isRootPath(): void {
    this.isRoot = this.router.url === '/order'
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef)
  }

  open(): void {
    this.modal.open()
    this.select = MaterializeService.initSelect(this.selectRef)
    this.dateRegister = MaterializeService.iniDatepicker(this.dateRegisterRef, null)
  }

  submit(): void {
    this.pending = true

    if (this.isNewClient) {
      this.client = this.form.getRawValue()
      this.order.client = this.client
      this.order.status = OrderStatus.TAKE
      this.order.deadline = this.dateRegister.date
    } else {
      this.order.clientId = this.selectedClientId
      this.order.comment = this.comment
      this.order.status = OrderStatus.TAKE
      this.order.deadline = this.dateRegister.date
    }

    this.order.list = this.modalOrderService.list.map(item => {
      delete item._id
      return item
    })

    this.subscription = this.ordersService.create(this.order)
      .subscribe(
        (newOrder) => {
          MaterializeService.toast(`Заказ №${newOrder.order['order']} был создан.`)
        },
        error => MaterializeService.toast(error.error.message),
        () => {
          this.modal.close()
          this.pending = false
        }
      )
  }

  cancel(): void {
    this.modal.close()
  }

  removePosition(orderPosition: OrderPosition): void {
    if (this.modalOrderService.list.length !== 1) {
      this.modalOrderService.remove(orderPosition)
    }
  }

  ngOnDestroy(): void {
    this.modal.destroy()
    this.subscription?.unsubscribe()
  }

  updateFields(): void {
    this.form.markAllAsTouched()
    setTimeout(() => {
      MaterializeService.updateTextFields()
      this.select = !this.isNewClient ? MaterializeService.initSelect(this.selectRef) : null
      this.dateRegister = !this.isNewClient ? MaterializeService.iniDatepicker(this.dateRegisterRef, null) : null
    }, .1)
  }
}
