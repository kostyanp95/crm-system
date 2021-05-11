import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionService } from '../../../../shared/services/position.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Position } from '../../../../shared/models/position.model';
import { OrderService } from '../../services/order.service';
import { MaterializeService } from '../../../../shared/services/materialize.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Array<Position>>

  constructor(private activatedRoute: ActivatedRoute,
              private positionService: PositionService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.positions$ = this.activatedRoute.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionService.fetch(params['id'])
          }
        ),
        map(
          (positions: Array<Position>) => {
            return positions.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  addToOrder(position: Position) {
    this.orderService.add(position)
    MaterializeService.toast(`Добавлено x${position.quantity} ${position.name}`)
  }
}
