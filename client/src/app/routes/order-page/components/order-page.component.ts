import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { ModalOrderService } from '../services/modal-order.service';
import { Order, OrderPosition } from '../../../shared/models/order.model';
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
  modal: MaterializeInstance
  isRoot: boolean
  pending = false
  subscription: Subscription
  form: FormGroup
  isNewClient = false
  clients: Array<Client> = []
  selectedClientId: string
  selectedClient: Client

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
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      comment: ''
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
  }

  submit(): void {
    this.pending = true
    let clientId: string
    let client: Client
    const order: Order = {} as Order

    if (this.isNewClient) {
      client = this.form.getRawValue()
      order.client = client
      console.log('new client: ', client)
    } else {
      clientId = this.selectedClientId
      order['clientId'] = clientId
      console.log('clientId: ', clientId)
    }

    order.list = this.modalOrderService.list.map(item => {
      delete item._id
      return item
    })

    this.subscription = this.ordersService.create(order)
      .subscribe(
        (newOrder) => {
          MaterializeService.toast(`Заказ №${newOrder.order['order']} был добавлен.`)
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
    this.modalOrderService.remove(orderPosition)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
