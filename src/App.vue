<script setup lang='ts'>
import axios from 'axios'
import type { ECBasicOption } from 'echarts/types/dist/shared';
import { reactive } from 'vue';
import VChart from './components/VChart.vue';
import GlobalHeader from './components/GlobalHeader.vue';

const dailyReportOptionGetter = async () => {
  const resp = await axios.get('/daily-report/latest')
  
  const up_down_aggregation_x: string[] = []
  const up_down_aggregation_y: any[] = []
  resp.data.up_down_aggregation.forEach((element: any, index: number) => {
    up_down_aggregation_x.push(element.range)
    up_down_aggregation_y.push({
      value: element.count,
      itemStyle: {
        color: index > 10 ? `#a90000` : `#00a900`
      }
    })
  })

  const option: ECBasicOption = reactive({
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 },
      data: up_down_aggregation_x
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: up_down_aggregation_y,
        type: 'bar'
      }
    ]
  })
  return option
}

</script>

<template>
  <GlobalHeader />
  <div class="container min-h-screen mx-auto max-w-7xl bg-stone-50">
    <suspense>
      <template #default>
        <div class="h-[500px] w-full">
          <VChart :optionGetter="dailyReportOptionGetter" />
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
