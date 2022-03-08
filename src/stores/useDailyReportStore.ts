import { defineStore } from "pinia";
import axios from 'axios'
import { number } from "echarts/core";

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
  fetchDailyReport( date?: string ): void
}

export const useDailyReportStore = defineStore('daily-report', (): DailyReportStore => ({
  stockList: [],
  upDownRank: [],
  upDownAggregation: {
    x: [],
    y: []
  },
  async fetchDailyReport(date='latest') {
    const resp = await axios.get(`/daily-report/${date}`)
    const data = resp.data

    const stockList: StockBasicInfo[] = []
    data['stock_list'].forEach((element: any) => {
      stockList.push({
        tsCode: element['TS_CODE'],
        name: element['NAME'],
        industry: element['INDUSTRY'],
        area: element['AREA']
      })
    });
    this.stockList = stockList

    const upDownRank: StockDailyInfo[] = []
    data['up_down_rank'].forEach((element: any) => {
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

    const upDownAggregationX: string[] = []
    const upDownAggregationY: any[] = []
    data['up_down_aggregation'].forEach((element: any, index: number) => {
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
  }
})) 