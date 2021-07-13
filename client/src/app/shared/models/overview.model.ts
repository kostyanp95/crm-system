export interface OverviewModel {
  orders: OverviewItem,
  gain: OverviewItem
}

export interface OverviewItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}
