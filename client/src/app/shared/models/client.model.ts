import { Order } from './order.model';

export interface Client {
  name: string;
  surname: string;
  lastname?: string;
  email?: string;
  phone: string;
  orders?: Array<Order>,
  order: number,
  _id?: string
}
