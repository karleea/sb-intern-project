<script>
export default {
  name: 'SHeader'
}
</script>

<template>
  <header class="header">
    <slot />
  </header>
</template>

<style lang="scss" scoped>
.header {
  column-gap: 18px;
  display: flex;
}
</style>