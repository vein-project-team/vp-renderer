<script setup lang='ts'>
import type { ECBasicOption } from 'echarts/types/dist/shared'
import type { StockBasicInfo, StockDailyInfo } from '../stores/useDailyReportStore'
import { computed, ref, Ref, watch } from 'vue'
import VChart from '../components/VChart.vue'
import { useDailyReportStore } from '../stores/useDailyReportStore' //不需要ts后缀

const dailyReportStore = useDailyReportStore()

dailyReportStore.fetchDailyReport()

const stockRecords = computed(() => {
  return dailyReportStore.getStockRecords()
})

const option = computed(() => ({
  tooltip:{
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      
    }, 
    animation: true,
    animationDuration: 1000,
    animationDurationUpdate: 200,
  },
  xAxis: {
    type: 'category',
    axisLabel: { interval: 0, rotate: 30 },
    data: dailyReportStore.upDownAggregation.x,
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '股票数量',
      data: dailyReportStore.upDownAggregation.y,
      type: 'bar',
      label:{
        show: true,
        position: 'top'
      }
    },
  ]
}))

// const chartKey = ref(1)

// watch(option, () => {
//   chartKey.value *= -1
// })


</script>

<template>
  <div class="container min-h-screen mx-auto max-w-7xl bg-stone-50">
    <div>
      <div class="w-full flex h-16 text-black bg-stone-200 text-xl p-4 mt-6 mx-auto">
        <span class="w-32 text-center font-bold">涨跌分布</span>
      </div>
      <div class="h-[500px] w-full">
        <VChart :option="option" />
      </div>
      <div class="w-full flex h-16 text-black bg-stone-200 text-xl p-4 mt-6 mx-auto">
        <div class="w-fit flex mx-auto">
          <span class="w-32 text-center font-bold">代码</span>
          <span class="w-28 text-center">名称</span>
          <span class="w-28 text-center">行业</span>
          <span class="w-28 text-center">地区</span>
          <span class="w-28 text-center">开盘</span>
          <span class="w-28 text-center">收盘</span>
          <span class="w-28 text-center">最高</span>
          <span class="w-28 text-center">最低</span>
          <span class="w-28 text-center">昨收</span>
          <span class="w-28 text-center">涨跌幅</span>
        </div>
      </div>
      <div class="h-[800px] overflow-scroll mb-6">
        <div v-for="stock in stockRecords" class="w-fit flex h-16 text-black text-xl p-4 hover:bg-slate-100 mx-auto">
          <span class="w-32 text-center font-bold text-stone-400">{{ stock.tsCode }}</span>
          <span class="w-28 text-center">{{ stock.name }}</span>
          <span class="w-28 text-center">{{ stock.industry }}</span>
          <span class="w-28 text-center">{{ stock.area }}</span>
          <span v-if="stock.open > stock.preClose" class="w-28 text-center text-red-700">{{ stock.open }}</span>
          <span v-else-if="stock.open == stock.preClose" class="w-28 text-center text-gray-700">{{ stock.open }}</span>
          <span v-else class="w-28 text-center text-green-700">{{ stock.open }}</span>

          <span v-if="stock.close > stock.preClose" class="w-28 text-center text-red-700">{{ stock.close }}</span>
          <span v-else-if="stock.close == stock.preClose" class="w-28 text-center text-gray-700">{{ stock.close
          }}</span>
          <span v-else class="w-28 text-center text-green-700">{{ stock.close }}</span>

          <span v-if="stock.high > stock.preClose" class="w-28 text-center text-red-700">{{ stock.high }}</span>
          <span v-else-if="stock.high == stock.preClose" class="w-28 text-center text-gray-700">{{ stock.high }}</span>
          <span v-else class="w-28 text-center text-green-700">{{ stock.high }}</span>

          <span v-if="stock.low > stock.preClose" class="w-28 text-center text-red-700">{{ stock.low }}</span>
          <span v-else-if="stock.low == stock.preClose" class="w-28 text-center text-gray-700">{{ stock.low }}</span>
          <span v-else class="w-28 text-center text-green-700">{{ stock.low }}</span>

          <span class="w-28 text-center text-gray-700">{{ stock.preClose }}</span>

          <span v-if="stock.pctChange > 0" class="w-28 text-center text-red-700">{{ (stock.pctChange * 100).toFixed(2)
          }}%</span>
          <span v-else-if="stock.pctChange == 0" class="w-28 text-center text-gray-700">{{ (stock.pctChange *
              100).toFixed(2)
          }}%</span>
          <span v-else class="w-28 text-center text-green-700">{{ (stock.pctChange * 100).toFixed(2) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
