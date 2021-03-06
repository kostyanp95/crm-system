export interface Order {
  date?: Date
  order?: number
  list: Array<OrderPosition>
  user?: string
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}
