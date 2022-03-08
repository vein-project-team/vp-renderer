<script setup lang='ts'>
import type { ECBasicOption } from 'echarts/types/dist/shared'
import type { StockBasicInfo, StockDailyInfo } from '../stores/useDailyReportStore'
import { computed, ref, Ref, watch } from 'vue'
import VChart from '../components/VChart.vue'
import { useDailyReportStore } from '../stores/useDailyReportStore'

const dailyReportStore = useDailyReportStore()

dailyReportStore.fetchDailyReport()

const upDownRank = computed(() => {
  return dailyReportStore.upDownRank
})

const stockList = computed(() => {
  return dailyReportStore.stockList
})

const stockRecords: Ref<(StockBasicInfo & StockDailyInfo)[]> = computed(() => {
  const t: (StockBasicInfo & StockDailyInfo)[] = []
  upDownRank.value.forEach((stockDailyInfo) => {
    const stockBasicInfo = stockList.value.find((stockBasicInfo) => {
      return stockBasicInfo.tsCode == stockDailyInfo.tsCode
    })
    t.push({
      ...stockBasicInfo as StockBasicInfo,
      ...stockDailyInfo
    })
  })
  return t
})

const option: Ref<ECBasicOption> = computed(() => ({
  xAxis: {
    type: 'category',
    axisLabel: { interval: 0, rotate: 30 },
    data: dailyReportStore.upDownAggregation.x
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: dailyReportStore.upDownAggregation.y,
      type: 'bar'
    }
  ]
}))

const chartKey = ref(1)

watch(option, () => {
  chartKey.value *= -1
})


</script>

<template>
  <div class="container min-h-screen mx-auto max-w-7xl bg-stone-50">
    <suspense>
      <template #default>
        <div>
          <div class="h-[500px] w-full">
            <VChart :option="option" />
          </div>
          <div class="w-fit h-[800px] overflow-scroll m-6 mx-auto">
            <div v-for="stock in stockRecords" class="w-fit flex h-16 text-black text-xl p-4 hover:bg-slate-100">
            <span class="w-28 items-center">{{ stock.tsCode }}</span>
            <span class="w-28 items-center">{{ stock.name }}</span>
            <span class="w-28 items-center">{{ stock.industry }}</span>
            <span class="w-28 items-center">{{ stock.area }}</span>
            <span class="w-28 items-center">{{ stock.open }}</span>
            <span class="w-28 items-center">{{ stock.close }}</span>
            <span class="w-28 items-center">{{ stock.high }}</span>
            <span class="w-28 items-center">{{ stock.low }}</span>
            <span class="w-28 items-center">{{ stock.preClose }}</span>
            <span class="w-28 items-center">{{ stock.pctChange }}</span>
          </div>
          </div>
        </div>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
  </div>
</template>

<style scoped>
</style>
