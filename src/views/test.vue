<script setup lang="ts">
import * as echarts from 'echarts';
import { computed, ref, Ref, watch } from 'vue'
import VChart from '../components/VChart.vue'

// function drawLine() {
//   let myChart = this.$echarts.init(this.$refs.b);
// }
const option = computed(() => ({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]})) 
  

</script>
<template>
  <div class="h-[500px] w-full">
    <VChart :option="option" />
  </div>
</template>