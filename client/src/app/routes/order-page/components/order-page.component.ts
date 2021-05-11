import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { ModalOrderService } from '../services/modal-order.service';
import { Order, OrderPosition } from '../../../shared/models/order.model';
import { OrdersService } from '../../../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.scss'],
    providers: [ModalOrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('modal') modalRef: ElementRef
    modal: MaterializeInstance
    isRoot: boolean
    pending = false
    subscription: Subscription

    constructor(private router: Router,
                public modalOrderService: ModalOrderService,
                private ordersService: OrdersService) {
    }

    ngOnInit(): void {
        this.isRootPath()
        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.isRootPath()
                }
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

    submit() {
        this.pending = true

        const order: Order = {
            list: this.modalOrderService.list.map(item => {
                delete item._id
                return item
            })
        }

        this.subscription = this.ordersService.create(order)
            .subscribe(
                newOrder => {
                    MaterializeService.toast(`Заказ №${newOrder.order} был добавлен.`)

                },
                error => MaterializeService.toast(error.error.message),
                () => {
                    this.modal.close()
                    this.pending = false
                }
            )
    }

    cancel() {
        this.modal.close()
    }

    ngOnDestroy(): void {
        this.modal.destroy()
        this.subscription ? this.subscription.unsubscribe() : null
    }

    removePosition(orderPosition: OrderPosition) {
        this.modalOrderService.remove(orderPosition)
    }
}
