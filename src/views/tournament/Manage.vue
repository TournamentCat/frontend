<script setup>

import Box from '@/components/Box.vue'
import Tournament from './Tournament.vue'
import { ref } from 'vue'
import { tournamentStore } from '@/stores/tournament'
import router from '@/router';

const tournament = tournamentStore()
const newName = ref('')
const edit = async event => {
	if(!newName.value) return
	const resp = await fetch(`/api/tournaments/${tournament.id}`, {
		method: 'PATCH',
		body: new URLSearchParams({
			name: newName.value
		}).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	router.go()
}
const _delete = async event => {
	const resp = await fetch(`/api/tournaments/${tournament.id}`, {
		method: 'DELETE'
	})
	router.push('/')
}

</script>

<template>
	<Tournament view="Manage">
		<Box>
			<div><label for="manage-name">New name</label><input type="text" id="manage-name" name="name" v-model="newName"><button @click.prevent="edit">Edit Name</button></div>
			<div><button @click="_delete">Delete Tournament</button></div>
		</Box>
	</Tournament>
</template>
