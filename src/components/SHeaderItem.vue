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
    <a href="/">
      <h1 class="initials">{{ initials }}</h1>
    </a>
    <component :is="icon" />
  </div>
</template>

<style lang="scss" scoped>

$on-hover: #c41f32;
$visited:  #91969e;
  .header-item {
    align-items: center;
    column-gap: 8px;
    display: flex;
    padding: 12px;
  }

  a:visited{
    color: $visited;
  } 
  
  a:hover{
    color: $on-hover;
  }
  .initials {
    font-size: 20px;
  }
</style>