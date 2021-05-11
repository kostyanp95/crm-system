import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterializeInstance, MaterializeService } from '../../../shared/services/materialize.service';
import { OrderService } from '../services/order.service';
import { OrderPosition } from '../../../shared/models/order.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterializeInstance
  isRoot: boolean

  constructor(private router: Router,
              public  orderService: OrderService) {
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
    this.modal.close()
  }

  cancel() {
    this.modal.close()
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  removePosition(orderPosition: OrderPosition) {
    this.orderService.remove(orderPosition)
  }
}
