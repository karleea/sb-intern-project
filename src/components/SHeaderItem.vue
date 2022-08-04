<script>
export default {
  name: 'SHeaderItem'
}
</script>

<script setup>
const props = defineProps({
  initials: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="header-item">
    <span class="initials"><h1>{{ initials }}</h1></span>

    <component :is="icon" />
  </div>
</template>

<style lang="scss" scoped>
.header-item {
  align-items: center;
  column-gap: 8px;
  display: flex;
  padding: 12px;
}
.initials {
  font-size: 20px;
}
</style>