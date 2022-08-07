<script>
	export default {
	  name: 'SButton'
	}

</script>

<template>
	<button class="btn">
		<slot/>
	</button>
</template>

<!-- TODO: Style button -->
<style lang="scss" scoped>
.btn {
	padding: 12px 12px;
	background-color:  #ffff;
	border: 2px solid  #ffff;
}

.btn:hover {
	border: 2px solid  #ffff;
}
</style>
