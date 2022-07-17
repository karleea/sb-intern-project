<script setup>
import { computed, inject, ref } from 'vue'
import Header from '@/components/SHeader.vue'
import Row from '@/components/SRow.vue'
const axios = inject('axios')
const allSports = ref([])
const events = ref([])
const bets = ref([])
const teams = ref([])
const sports = ref([])

axios
  .get('/all-sports')
  .then(({ data }) => (allSports.value = data))
axios
  .get('/events')
  .then(({ data }) => (events.value = data))
axios
  .get('/bets')
  .then(({ data }) => (bets.value = data))
axios
  .get('/teams')
  .then(({ data }) => (teams.value = data))
axios
  .get('/sports')
  .then(({ data }) => (sports.value = data))
// A set of rows by sport
// Within each sport there are events

const eventRows = computed(() => {
  return sports.value?.map(sport => { 
    const sportEvents = sport.eventIds.map(eventId => {
    const event = events?.value?.find(event => event.id === eventId)
    const [ teamOneData, teamTwoData ] = event.participants
    const teamOneInfo = teams.value?.find(team => team.id === teamOneData.id) 
    const teamTwoInfo = teams.value?.find(team => team.id === teamTwoData.id)
    const [ teamOneSpreadId, teamOneMLId ] = teamOneData.betIds
    const teamOneSpread = bets.value?.find(bet => bet.id === teamOneSpreadId).lineage
    const teamOneML = bets.value?.find(bet => bet.id === teamOneMLId).lineage
    const [ teamTwoSpreadId, teamTwoMLId ] = teamTwoData.betIds
    const teamTwoSpread = bets.value?.find(bet => bet.id === teamTwoSpreadId).lineage
    const teamTwoML = bets.value?.find(bet => bet.id === teamTwoMLId).lineage
    return {
      
      id: eventId,
      firstTeam: teamOneInfo.name,
      secondTeam: teamTwoInfo.name,
      teamOneSpread,
      teamTwoSpread,
      teamOneML,
      teamTwoML,
    }
  })
  return {
    name: sport.name,
    initials: sport.key,
    allEvents: sportEvents
  }})
  // return sports.value?.map(sport => {
  //   const sportEvents = sport?.eventIds?.map(eventId => {
  //     const event = events?.value?.find(event => event.id === eventId)
        
  //     const participants = event?.participants.map(participant => {
  //       const teamInfo = teams.value.find(team => team.id === participant.id)
  //       return {
  //         participantInfo: teamInfo,
  //         bets: participant.betIds.map(betId => bets.value.find(bet => bet.id === betId))
  //       }
  //     })
  //     return {
  //       id: event.id,
  //       participants
  //     }
  //   })
  //   return {
  //     sportEvents,
  //     name: sport.name,
  //     key: sport.key,
  //   }
  // })
})
// For each event there are:
//// Team One, Team Two, Team One ML, Team One Spread, Team Two Money Line, Team Two Spread
// Submit button will have: 'eventId', 'betId', 'teamId'
</script>
<template>
  <div class="container">
    <Header class="header" :sports="allSports" />
    <aside class="sidebar">
      Sidebar
    </aside>
    <main class="content">
      <Row class = "sportrow" :eventlistbysport="eventRows"/> 

    </main>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: minmax(25%, 300px) 1fr;
  grid-template-rows: auto 1fr;
}
.sidebar {
  grid-area: 1 / 1 / 3 / 2;
}
.header {
  grid-area: 1 / 2 / 2 / 3;
}
.content {
  grid-area: 2 / 2 / 3 / 3;
}
</style>