<template>
  <div class="wrapper">
    <div class="left-pane">
      <slot name="left-pane">
        <div class="pane">
          <h1>Clouds & Atmosphere</h1>
        </div>
      </slot>
    </div>
    <div class="divider" @mousedown="startResize"></div>
    <div class="right-pane">
      <slot name="right-pane">
        <div class="pane">
          <h1>Wind</h1>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const startResize = (e: MouseEvent) => {
  const divider = e.target as HTMLElement
  const leftPane = divider.previousElementSibling as HTMLElement
  const rightPane = divider.nextElementSibling as HTMLElement
  const startX = e.clientX
  const startWidth = leftPane.offsetWidth

  const mouseMove = (e: MouseEvent) => {
    const newWidth = startWidth + (e.clientX - startX)
    leftPane.style.width = `${newWidth}px`
    rightPane.style.width = `${window.innerWidth - newWidth}px`
  }

  const mouseUp = () => {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
  }

  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('mouseup', mouseUp)

  return () => {
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
  }
}
</script>

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
  height: 100%;
  max-width: 100%;
}

.left-pane {
  display: flex;
  justify-content: center;
  margin-right: 1rem;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.right-pane {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.divider {
  width: 5px;
  cursor: ew-resize;
  background-color: #ccc;
}
</style>
