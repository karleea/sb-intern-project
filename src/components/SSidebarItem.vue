<script>
export default {
  name: 'SSidebarItem'
}
</script>

<script setup>
const props = defineProps({
  text: {
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
  <div class="sidebar-item">
    <a href="/">
      <h1 class="text"> {{ text }}
       <component class="=link-icon" :is="icon" />
      </h1> 
    </a>
  </div>
</template>

<style lang="scss" scoped>
a:visited {
  color: #91969e;
}

a:hover {
  color: #c41f32;
}

a:link {
  text-decoration: none;
}

.sidebar-item {
  align-items: center;
  display: flex;
  padding: 30px;
  color: #91969e;
}

.sidebar-item:hover {
  color: #c41f32;
}

.text {
  font-size: 24x;
}

.link-icon {
  margin-left: 15px;
}
</style>