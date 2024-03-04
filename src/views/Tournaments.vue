<script setup>

import Box from '@/components/Box.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const tdata = ref([])

const searchText = ref('')
const search = async () => {

	const resp = await fetch('/api/tournaments/search?q=' + searchText.value)
	const data = await resp.json()

	tdata.value = data
}
</script>

<template>
	<div :class="$style.layout">
		<h1>Search</h1>
		<Box :class="$style.searchbox">
			<form :class="$style.form" @submit.prevent="search">
				<input type="text" v-model="searchText">
				<button type="submit" class="highlight-background">search</button>
			</form>
			<div :class="$style.create">or <RouterLink to="/tournaments/create" class="highlight-text">create new tournament</RouterLink> instead.</div>
		</Box>
		<Box :class="$style.twrapper">
			<div v-for="t in tdata" :class="$style.t"><span>{{ t.name }}</span><RouterLink :to="`/tournaments/@${t._id}`">Go</RouterLink></div>
		</Box>
	</div>
	
</template>

<style module>
.layout {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: auto 100px 1fr;
	gap: 10px;
}
.twrapper {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.t {
	display: flex;
	justify-content: space-between;
}
.searchbox {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.create {
	line-height: 1;
	font-size: 1rem;
}
.form {
	display: grid;
	gap: 10px;
	grid-template-columns: 1fr auto;
	width: 100%;
	padding: 0 20px;
}
</style>
