import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/order.model';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { Client } from '../../../shared/models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../shared/services/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() clients: Array<Client>
  @ViewChild('clientModal') clientModalRef: ElementRef

  selectedClient: Client
  selectedOrder: Order
  selectedOrders: Array<Order>
  form: FormGroup
  clientModal: MaterializeInstance
  editClientModal = false
  ordersClientModal = false

  constructor(private fb: FormBuilder,
              private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    MaterializeService.updateTextFields()
  }

  initClientForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      lastname: '',
      phone: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  ngAfterViewInit(): void {
    this.clientModal = MaterializeService.initModal(this.clientModalRef)
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
    this.form.patchValue(this.selectedClient)
    setTimeout(() => MaterializeService.updateTextFields(), .1)
  }

  openClientOrdersModal(client: Client): void {
    this.editClientModal = false
    this.ordersClientModal = true
    this.selectedClient = client
    this.selectedOrders = client.orders
    this.clientModal.open()
  }

  closeModals(): void {
    this.editClientModal = false
    this.ordersClientModal = false
    this.clientModal.close()
  }

  ngOnDestroy(): void {
    this.clientModal.destroy()
  }

  editClient(): void {
    const editedClient: Client = this.form.getRawValue()
    editedClient._id = this.selectedClient._id
    this.clientsService.update(editedClient)
      .subscribe()
  }
}
