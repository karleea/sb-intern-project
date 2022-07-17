<script>
export default {
    name: 'SEventCard'
}
</script>

<script setup>
const props=defineProps({
    event: {
        type: Object,
        required: true
    }

})
</script>

<template><div class="card"><h3>{{ event.firstTeam }} v {{ event.secondTeam }}</h3><br>
<div class="content">
<span class="column-one"><br>{{ event.firstTeam }} <br>
{{ event.secondTeam }}</span> 
<span class="column-two">ML
<!--TODO: replace with button component to display ML  -->
><br>
{{event.teamOneML}}
<br>
{{event.teamTwoML}}</span>
<!--TODO: replace with button component to display Spread  -->
    <span class="column-three">Spread
        <br>
        {{event.teamOneSpread}}
        <br>
        {{event.teamTwoSpread}}
    </span>
    </div></div>



</template>
<style lang="scss" scoped>

.content {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

}

.column-one {
    grid-column:1;
}

.column-two {
    grid-column: 2;
}

.column-three {
    grid-column: 3;
}

</style>
