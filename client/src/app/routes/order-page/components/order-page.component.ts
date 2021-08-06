import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
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
  // @ViewChild('select') selectRef: ElementRef
  @ViewChild('autocomplete') autocompleteRef: ElementRef
  modal: MaterializeInstance
  select: MaterializeInstance
  autocomplete: MaterializeInstance
  isRoot: boolean
  pending = false
  subscription: Subscription
  form: FormGroup
  orderForm: FormGroup;
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
    this.initOrderForm()
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
      orderName: [null, Validators.required],
      orderQuantity: [null, Validators.required],
      orderCost: [null, Validators.required],
      isNewClient: false,
      name: [null, Validators.required],
      surname: null,
      phone: [null, Validators.required],
      comment: null
    })
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      name: [null, Validators.required],
      quantity: [null, Validators.required],
      cost: [null, Validators.required]
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
    console.log(this.clients)

    const clientsForAutocomplete = {
      data: {}
    }
    this.clients.forEach(client => {
      const clientNameAndPhone = `${client.name} ${client?.surname}, тел: ${client?.phone}`
      clientsForAutocomplete.data[clientNameAndPhone] = null
    })
    console.log(clientsForAutocomplete)

    // this.select = MaterializeService.initSelect(this.selectRef)
    this.autocomplete = MaterializeService.initAutocomplete(this.autocompleteRef, clientsForAutocomplete)
  }

  submit(): void {
    this.pending = true
    let client: Client
    const order: Order = {} as Order

    if (this.isNewClient) {
      client = this.form.getRawValue()
      order.client = client
      order.status = OrderStatus.TAKE
      order.list = this.orderForm.getRawValue()
    } else {
      order['clientId'] = this.selectedClientId
      order['comment'] = this.comment
      order.status = OrderStatus.TAKE
      order.list = this.orderForm.getRawValue()
    }

    order.list = this.modalOrderService.list.map(item => {
      delete item?._id
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
    this.subscription?.unsubscribe()
  }

  updateFields(): void {
    this.form.markAllAsTouched()
    setTimeout(() => {
      MaterializeService.updateTextFields()
      // this.select = !this.isNewClient ? MaterializeService.initSelect(this.selectRef) : null
    }, .1)
  }
}
