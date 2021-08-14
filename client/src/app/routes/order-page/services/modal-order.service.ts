import { Injectable } from '@angular/core';
import { Position } from '../../../shared/models/position.model';
import { OrderPosition } from '../../../shared/models/order.model';

@Injectable()
export class ModalOrderService {

  list: Array<OrderPosition> = [
    {
      name: 'Название',
      quantity: 1,
      cost: 0
    }
  ]
  price = 0

  constructor() {
  }

  add(position: Position): void {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.list.find(p => p._id === position._id)

    if (candidate) {
      candidate.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition)
    }

    this.computePrice()

  }

  remove(orderPosition: OrderPosition): void {
    const index = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(index, 1)
    this.computePrice()
  }

  clear(): void {
    this.list = []
    this.price = 0
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

}
