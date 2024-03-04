<script setup>

import Box from '@/components/Box.vue'
import ContentBox from '@/components/ContentBox.vue'
import { RouterLink } from 'vue-router'
import { ref, unref } from 'vue'
import { authStore } from '@/stores/auth'
import getUserId from '@/utils/getUserId'
import router from '@/router'

const auth = authStore()

const newName = ref('')

if(!auth.loggedIn) {
	router.push('/login?redirect=/dashboard')
}

const changeName = async () => {
	if(!unref(newName)) return void alert('Write a name')

	console.log(unref(newName))

	const resp = await fetch(`/api/auth/users/${getUserId(auth.token)}`, {
		method: 'PATCH',
		body: new URLSearchParams({
			name: unref(newName)
		}).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	switch(resp.status) {
		case 200:
		case 204:
			auth.logout()
			alert(`Name changed to ${unref(newName)}`)
			router.push('/login')
			break
		default:
			alert('error changing name')
	}
}

</script>

<template>
	<div :class="$style.layout">
		<h1>Dashboard</h1>
		<ContentBox heading="User tools">
			<label for="usertools-name">New name</label><input type="text" id="usertools-name" name="name" v-model="newName"/><button @click="changeName">change</button>
		</ContentBox>
		<ContentBox heading="Tournaments as an Organizer" contenteditable="">CREATE ONE NOOB</ContentBox>
		<ContentBox heading="Tournaments as a Player">SKILL ISSUE</ContentBox>
	</div>
</template>

<style module>
.layout {
	display: flex;
	flex-direction: column;
	gap: 10px;
	height: 100%;
}
</style>
