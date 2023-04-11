<script setup lang="ts"></script>

<template>
  <div class="main">
    <div class="left-pane">
      <h3 class="title">Clouds & Atmosphere</h3>
      <n-input-number class="forms" />
    </div>
    <div class="right-pane">
      <h3 class="title">Wind</h3>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.left-pane {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  overflow: hidden;
  padding-left: 2.5rem;
}

.forms {
  width: 50%;
}

.title {
  border-bottom: white 1px solid;
  margin-bottom: 3rem;
}

.right-pane {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 2rem;
  width: 50%;
  height: 100%;
  overflow: hidden;
  padding-right: 2.5rem;
}
</style>
