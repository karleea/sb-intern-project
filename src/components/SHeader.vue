<script>
export default {
  name: 'SHeader'
}
</script>

<script setup>
import { computed } from 'vue';
import HeaderItem from './SHeaderItem.vue';
import MlbIcon from './icons/MlbIcon.vue';
import NbaIcon from './icons/NbaIcon.vue';
import NflIcon from './icons/NflIcon.vue';
import NhlIcon from './icons/NhlIcon.vue';
const props = defineProps({
  sports: {
    type: Array,
    required: true
  }
})
const getIcon = sportKey => {
  switch (sportKey) {
    case 'nhl':
      return NhlIcon;
    case 'mlb':
      return MlbIcon;
    case 'nfl':
      return NflIcon;
    case 'nba':
      return NbaIcon;
  }
}
const sportsWithIcon = computed(() => props.sports.map(sport => ({
  ...sport,
  initials: sport.key.toUpperCase(),
  icon: getIcon(sport.key)
})))
</script>

<template>
  <header class="header">
    <HeaderItem
      v-for="sport in sportsWithIcon"
      :key="sport.key"
      :initials="sport.initials"
      :icon="sport.icon" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  column-gap: 18px;
  display: flex;
}
</style>