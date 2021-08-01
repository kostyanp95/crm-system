import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { Filter } from '../../shared/models/filter.model';

const STEP = 5

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isFilterVisible = false
  orders: Array<Order> = []
  filter: Filter = {}
  offset = 0
  limit: number = STEP
  subscription: Subscription
  loading = false
  reloading = true
  noMoreOrders = false

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.getListOrders();
  }

  private getListOrders(): void {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })

    this.subscription = this.ordersService.getList(params)
      .subscribe(
        orders => {
          this.orders = this.orders.concat(orders)
          this.noMoreOrders = orders.length < STEP
          this.loading = false
          this.reloading = false
        }
      )
  }

  loadMore(): void {
    this.offset += STEP
    this.loading = true
    this.getListOrders()
  }

  applyFilter(filter: Filter): void {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.getListOrders()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
