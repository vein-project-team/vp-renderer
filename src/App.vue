<script setup lang='ts'>
import axios from 'axios'
import { ECBasicOption } from 'echarts/types/dist/shared';
import { reactive } from 'vue';
import VChart from './components/VChart.vue';

const dailyReportOptionGetter = async () => {
  const resp = await axios.get('/daily-report/latest')
  console.log(resp)

  const option: ECBasicOption = reactive({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          150, 80, 70, 110, 130
        ],
        type: 'bar'
      }
    ]
  })
  return option
}

</script>

<template>
  <div style="height:400px; width:800px;">
    <suspense>
      <template #default>
        <VChart :optionGetter="dailyReportOptionGetter" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
  </div>
</template>

<style scoped>
</style>
