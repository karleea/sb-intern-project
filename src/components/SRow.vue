<script>
export default {
  name: 'SRow'
}
</script>

<script setup>
import EventCard from './SEventCard.vue'

const props = defineProps({
    eventlistbysport: {
        type: Array,
        required: true
    }
})

</script>
<template>
<div class="container" v-for="sport in eventlistbysport">
    <span class="sportname"><h2>{{ sport.name }}</h2></span>
    <div class="cards"><EventCard class="card"
     v-for="event in sport.allEvents"
     :event="event"/></div>
</div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column
 
}
.cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;

}

.card {
border: 2px solid #000000;
border-radius: 4px;
padding: .5rem;
 
}
.sportname {
    text-align: left;
    flex-basis: 100%;
}</style>