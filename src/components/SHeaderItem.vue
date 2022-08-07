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
			<h1 class="initials"> {{ initials }} 
			<component class="sport-icon" :is="icon" />
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

.header-item {
	align-items: center;
	display: flex;
	padding: 15px;
	color:#91969e;
}

.header-item:hover {
	color:#c41f32;
}	

.initials {
	font-size: 20px;
}  

.sport-icon {
	margin-left: 5px;
}
</style>