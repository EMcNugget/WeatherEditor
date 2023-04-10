<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <h1>Clouds & Atmosphere</h1>
    <div class="separator"></div>
    <h1>Wind</h1>
    <div class="separator"></div>
    <h1>Temperature</h1>
  </div>
</template>

<style scoped>
.separator {
  width: 0.5rem;
  cursor: ew-resize;
  background-color: #4f6c89;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
</style>