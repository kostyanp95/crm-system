import { Client } from './client.model';
import { User } from './interfaces';

export interface Order {
  date?: Date
  deadline?: Date
  order?: number
  list: Array<OrderPosition>
  user?: User
  client?: Client
  clientId?: string
  comment?: string
  status: OrderStatus
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}

export enum OrderStatus {
  TAKE = 'Принят',
  IN_WORK = 'В работе',
  COMPLETED = 'Завершен'
}
