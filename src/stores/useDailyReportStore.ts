import { defineStore } from "pinia";
import axios from 'axios'

export type StockBasicInfo = {
  tsCode: string,
  name: string,
  industry: string,
  area: string
}

export type StockDailyInfo = {
  tsCode: string,
  open: number,
  close: number,
  high: number,
  low: number,
  preClose: number,
  pctChange: number
}

type StockRecord = StockBasicInfo & StockDailyInfo

type UpDownAggregationY = {
  value: number,
  itemStyle: {
    color: string
  }
}

type DailyReportStore = {
  stockList: StockBasicInfo[],
  upDownRank: StockDailyInfo[],
  upDownAggregation: {
    x: string[],
    y: UpDownAggregationY[]
  },
  fetchDailyReport(date?: string): void,
  getStockRecords(): StockRecord[]
}

export const useDailyReportStore = defineStore('daily-report', (): DailyReportStore => ({
  stockList: [],
  upDownRank: [],
  upDownAggregation: {
    x: [],
    y: []
  },
  async fetchDailyReport(date = 'latest') {

    let resp = null

    // 涨跌家数
    resp = await axios.get(`/up-down-aggregation/${date}`)
    const rawUpDownAggregation = resp.data
    const upDownAggregationX: string[] = []
    const upDownAggregationY: any[] = []
    rawUpDownAggregation.forEach((element: any, index: number) => {
      upDownAggregationX.push(element.range)
      upDownAggregationY.push({
        value: element.count,
        itemStyle: {
          color: index > 10 ? `#a90000` : `#00a900`
        }
      })
    })
    this.upDownAggregation = {
      x: upDownAggregationX,
      y: upDownAggregationY
    }

    // 股票列表
    resp = await axios.get(`/stock-list/${date}`)
    const rawStockList = resp.data
    const stockList: StockBasicInfo[] = []
    rawStockList.forEach((element: any) => {
      stockList.push({
        tsCode: element['TS_CODE'],
        name: element['NAME'],
        industry: element['INDUSTRY'],
        area: element['AREA']
      })
    });
    this.stockList = stockList

    // 日行情
    resp = await axios.get(`/up-down-rank/${date}`)
    const rawUpDownRank = resp.data
    const upDownRank: StockDailyInfo[] = []
    rawUpDownRank.forEach((element: any) => {
      upDownRank.push({
        tsCode: element['TS_CODE'],
        open: element['OPEN'],
        close: element['CLOSE'],
        high: element['HIGH'],
        low: element['LOW'],
        preClose: element['PRE_CLOSE'],
        pctChange: element['PCT_CHANGE']
      })
    })
    this.upDownRank = upDownRank
  },
  getStockRecords() {
    const stockRecords: StockRecord[] = this.upDownRank.map((stockDailyInfo) => {
        const stockBasicInfo = this.stockList.find((stockBasicInfo) => {
          return stockBasicInfo.tsCode == stockDailyInfo.tsCode
        })
        return {
          ...stockBasicInfo as StockBasicInfo,
          ...stockDailyInfo as StockDailyInfo
        }
      }
    )
    return stockRecords
  }
})) 