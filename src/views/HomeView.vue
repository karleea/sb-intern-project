<script setup>
import { computed, inject, ref } from 'vue'
import Button from '@/components/SButton.vue'
import EventCard from '@/components/SEventCard.vue'
import Header from '@/components/SHeader.vue'
import HeaderItem from '@/components/SHeaderItem.vue'
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
	.get('/bets')
	.then(({ data }) => (bets.value = data))

axios
	.get('/events')
	.then(({ data }) => (events.value = data))

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
				firstTeam: {
					name: teamOneInfo.name,
					id: teamOneInfo.id,
					spread: {
						 id: teamOneSpreadId, 
						 value: teamOneSpread
					},
					ml: {
						id: teamOneMLId,
						value: teamOneML
					} 
				},
				secondTeam: {
					name: teamTwoInfo.name,
					id: teamTwoInfo.id,
					spread: {
						id: teamTwoSpreadId, 
						value: teamTwoSpread 
					},
					ml: { 
						id: teamTwoMLId,
						value: teamTwoML
					} 
				}
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
const sendBet = (eventID, teamID, betID) => {
	const bet = {
					betId: betID,
					eventId: eventID,
					teamId: teamID };

	axios.post('/submit', bet)
		.then(({ data }) => (console.log(data)))
}
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

<!-- TODO: Figure out how to make this less verbose -->
		<main class="content">
			<div
				v-for="{name, initial, allEvents} in eventRows"
				:key="{initial}"
				class="sport-row">
				<h2 class="sport-name"> {{ name }} </h2>
				<div class="cards">
					<EventCard v-for="{id, firstTeam, secondTeam} in allEvents" :key="id" class="card">
						<template #eventTitle>
							<h3> {{ firstTeam.name }} vs {{ secondTeam.name}} </h3> 
						</template>
						<template #teamOneName>
							{{ firstTeam.name }}
						</template>
						<template #teamOneML>
							<Button @click="sendBet(id, firstTeam.id, firstTeam.ml.id)">
								{{ firstTeam.ml.value }}
							</Button>
						</template>
						<template #teamOneSpread>
							<Button @click="sendBet(id, firstTeam.id, firstTeam.spread.id)">
								{{ firstTeam.spread.value }}
							</Button>
						</template>
						<template #teamTwoName>
							{{ secondTeam.name }}
						</template>
						<template #teamTwoML>
							<Button @click="sendBet(id, secondTeam.id, secondTeam.ml.id)">
								{{ secondTeam.ml.value }}
							</Button>
						</template>
						<template #teamTwoSpread>
							<Button @click="sendBet(id, secondTeam.id, secondTeam.spread.id)">
								{{ secondTeam.spread.value }}
							</Button>
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
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
}

.content{
grid-area: 2 / 2 / 3 / 3;
}

.sidebar {
	background-color: #081f36;
	grid-area: 1 / 1 / 3 / 2;
}

.header {
	grid-area: 1 / 2 / 2 / 3;
	background-color: #081f36;
}

.sport-row {
	display: flex;
	flex-direction: column;
	width: 65em
}

.sport-name {
	color: #c41f32;
}

.cards{
	display: flex;
	overflow-x: scroll;
}
	
.card {
	flex: 0 0 auto;
	margin: .25rem;
}
</style>
