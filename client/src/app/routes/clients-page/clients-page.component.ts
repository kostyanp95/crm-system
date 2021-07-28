import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterializeInstance, MaterializeService } from '../../shared/services/materialize.service';
import { Subscription } from 'rxjs';
import { Filter } from '../../shared/models/filter.model';
import { Client } from '../../shared/models/client.model';
import { ClientsService } from '../../shared/services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const STEP = 5

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss']
})
export class ClientsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('addClientModal') addClientModalRef: ElementRef
  addClientModal: MaterializeInstance
  isFilterVisible = false
  clients: Array<Client> = []
  filter: Filter = {}
  offset = 0
  limit: number = STEP
  subscription: Subscription
  loading = false
  reloading = false
  noMoreClients = false
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.getClientsList()
    this.initCreateClientForm()
  }

  initCreateClientForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      lastname: '',
      phone: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  ngAfterViewInit(): void {
    this.addClientModal = MaterializeService.initModal(this.addClientModalRef)
  }

  getClientsList(): void {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })

    this.subscription = this.clientsService.getList(params)
      .subscribe(
        clients => {
          this.clients = this.clients.concat(clients)
          this.noMoreClients = clients.length < STEP
          this.loading = false
          this.reloading = false
        }
      )
  }

  loadMore(): void {
    this.offset += STEP
    this.loading = true
    this.getClientsList()
  }

  applyFilter(filter: Filter): void {
    this.clients = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.getClientsList()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  openAddClientModal(): void {
    this.addClientModal.open()
  }

  ngOnDestroy(): void {
    this.addClientModal.destroy()
    this.subscription.unsubscribe()
  }

  createClient(): void {
    const client = this.form.getRawValue()
    this.clientsService.create(client)
      .subscribe(newClient => {
          if (newClient) {
            MaterializeService.toast(`Новый клиент ${newClient.name} успешно добавлен!`)
          }
          this.addClientModal.close()
        },
        error => MaterializeService.toast(`Ошибка сервера: ${error.error.message}...`)
      )
  }
}
