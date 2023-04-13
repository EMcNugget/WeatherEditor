<script setup lang="ts"/>

<template>
  <div class="flex flex-row w-full text-xl mt-2 font-sans font-semibold">
    <div class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-10">
      <h3 class="border-b border-white border-solid border-1 mb-12">Clouds & Atmosphere</h3>
      <AtmosphereClouds />
    </div>
    <div class="flex justify-center flex-col w-1/2 h-full overflow-hidden pl-8 pr-10">
      <h3 class="border-b border-white border-solid border-1 mb-12">Wind</h3>
      <WindConditions />
    </div>
  </div>
</template>

<script>
import AtmosphereClouds from './components/AtmosphereClouds.vue'
import WindConditions from './components/WindConditions.vue'

export default {
  components: {
    AtmosphereClouds,
    WindConditions
  }
}
</script>

<style scoped></style>
