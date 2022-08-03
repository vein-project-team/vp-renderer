import { defineStore } from "pinia";
import axios from 'axios'
import { StockBasicInfo } from '../stores/useDailyReportStore'

type StockKInfo = {
    tsCode: string,
    volume: number,
    open: number,
    close: number,
    highest: number,
    lowest: number,
}

type StockRecord = StockBasicInfo & StockKInfo

type KReportStore = {
    stockList: StockBasicInfo[],


    getStockRecords(): StockRecord[],
    //getAVGClose(tsCode: string, days: number): number,
}


// export const useKReportStore = defineStore('K-Report',():  KReportStore =>({
//     stockList:[],

//     getStockRecords(){

//     },

//     // async getAVGClose(tsCode, days){

//     // }

// }))