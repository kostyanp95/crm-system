import { Client } from './client.model';
import { User } from './interfaces';

export interface Order {
  date?: Date
  order?: number
  list: Array<OrderPosition>
  user?: User
  client?: Client
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}
