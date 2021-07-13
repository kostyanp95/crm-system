export interface AnalyticsModel {
  average: number
  chart: Array<AnalyticsChartItem>
}

export interface AnalyticsChartItem {
  gain: number
  order: number
  label: string
}
