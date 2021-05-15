import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MaterializeInstance, MaterializeService } from "../../shared/services/materialize.service";
import { OrdersService } from '../../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../../shared/models/order.model';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterializeInstance
  isFilterVisible: boolean = false
  orders: Array<Order> = []
  offset: number = 0
  limit: number = STEP
  subscription: Subscription
  loading: boolean = false
  reloading: boolean = false
  noMoreOrders: boolean = false

  constructor(private ordersService: OrdersService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getListOrders();
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterializeService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy(): void {
    this.tooltip.destroy()
    this.subscription.unsubscribe()
  }

  private getListOrders(): void {
    const params = {
      offset: this.offset,
      limit: this.limit

    }
    this.subscription = this.ordersService.getList(params)
      .subscribe(
        orders => {
          this.orders = this.orders.concat(orders)
          this.noMoreOrders = orders.length < STEP
          this.loading = false
          this.reloading = false
          this.cdr.markForCheck()
        }
      )
  }

  loadMore(): void {
    this.offset += STEP
    this.loading = true
    this.getListOrders()
  }
}
