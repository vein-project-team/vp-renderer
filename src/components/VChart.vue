<script setup lang='ts'>
import type { ECBasicOption } from 'echarts/types/dist/shared';
import EChart from 'vue-echarts'

defineProps<{
  option: ECBasicOption
}>()


</script>

<template>"
  <EChart :option="option" />
</template>

<style scoped>
</style>
