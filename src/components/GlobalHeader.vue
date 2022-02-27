<script setup lang='ts'>

</script>

<template>
  <div class="header">
    <div class="float-left">
      <span class=""></span>
      <router-link to="/" class="header-logo">VeinProj</router-link>
    </div>
  </div>
  <div class="w-full h-16"></div>
</template>

<style scoped>
.header {
  @apply fixed w-full h-16 bg-amber-900 px-3 py-3;
}
.header-logo {
  @apply text-white text-3xl font-bold;
  @apply cursor-pointer;
}
</style>