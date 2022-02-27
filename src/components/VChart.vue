<script setup lang='ts'>
import { ECBasicOption } from 'echarts/types/dist/shared';
import EChart from 'vue-echarts'

const props = defineProps<{
  optionGetter: () => Promise<ECBasicOption>
}>()


const option = await props.optionGetter()

</script>

<template>
  <EChart :option="option" />
</template>

<style scoped>
</style>
