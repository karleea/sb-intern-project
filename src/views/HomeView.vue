<script setup>
import { computed, inject, ref } from 'vue'
import Header from '@/components/SHeader.vue'
import HeaderItem from '@/components/SHeaderItem.vue'
import EventCard from '@/components/SEventCard.vue'
import MlbIcon from '@/components/icons/MlbIcon.vue'
import NbaIcon from '@/components/icons/NbaIcon.vue'
import NflIcon from '@/components/icons/NflIcon.vue'
import NhlIcon from '@/components/icons/NhlIcon.vue'

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
// Within each sport there are is an array of Event objects
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
      initial: sport.key,
      allEvents: sportEvents
    }
  })
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

const sportsWithIcon = computed(() => allSports.value.map(sport => ({
  ...sport,
  initials: sport.key.toUpperCase(),
  icon: getIcon(sport.key)
})))

// // Submit button will have: 'eventId', 'betId', 'teamId'
</script>
<template>
  <div class="container">
    <Header>
      <HeaderItem
        v-for="sport in sportsWithIcon"
        :key="sport.key"
        :initials="sport.initials"
        :icon="sport.icon"/>
    </Header>

    <aside class="sidebar">
      Sidebar
    </aside>

    <main class="content">
      <div v-for="sport in eventRows"
      :key="sport.initial" class="sportRow">
        <h2>{{ sport.name }}</h2>
        <div class="cards">
          <EventCard v-for="event in sport.allEvents"
          :key="event.id" class="card">
            <template v-slot:eventtitle>
                <h3>{{ event.firstTeam }} vs {{ event.secondTeam}}</h3> 
            </template>
            <template v-slot:teams>
              {{ event.firstTeam }}
              <br>
              {{ event.secondTeam }}
            </template>
            <template v-slot:ml>
              {{event.teamOneML}}
              <br>
              {{event.teamTwoML}}
            </template>
            <template v-slot:spread>
              {{event.teamOneSpread}}
              <br>
              {{event.teamTwoSpread}}
            </template>
          </EventCard>
        </div>
      </div>
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

.sportRow {
    display: flex;
    flex-direction: column
 
}
.cards{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: auto;
    grid-gap: 1rem;}


</style>