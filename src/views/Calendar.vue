<script setup lang="ts">
import * as echarts from 'echarts';
import { computed, ref, Ref, watch } from 'vue'
import VChart from '../components/VChart.vue'

function getVirtulData(year: string) {
  year = year || '2017';
  let date = +echarts.number.parseDate(year + '-01-01');
  let end = +echarts.number.parseDate(+year + 1 + '-01-01');
  let dayTime = 3600 * 24 * 1000;
  let data: [string, number][] = [];
  for (let time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 1000)
    ]);
  }
  return data;
}

const option = computed(() => ({
    tooltip: {
    position: 'top'
  },
  visualMap: {
    min: 0,
    max: 1000,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    top: 'top'
  },

  calendar: [
    {
      range: '2017',
      cellSize: ['auto', 20]
    },
    {
      top: 260,
      range: '2016',
      cellSize: ['auto', 20]
    },
    {
      top: 450,
      range: '2015',
      cellSize: ['auto', 20],
      right: 5
    }
  ],

  series: [
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: 0,
      data: getVirtulData('2017')
    },
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: 1,
      data: getVirtulData('2016')
    },
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: 2,
      data: getVirtulData('2015')
    }
  ]
}))

</script>

<template>
  <div class="h-[700px] w-full px-5">
    <VChart :option="option" />
  </div>
</template>