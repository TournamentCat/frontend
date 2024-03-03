<script setup>

import Box from '@/components/Box.vue'
import router from '@/router'
import { authStore } from '@/stores/auth'

const auth = authStore()

const handleSignup = data => {
	console.log(data)
	alert('Sign up successful')
	router.push('/login')
}

const submit = async event => {
	console.log('hi')

	const data = new FormData(event.target)

	const resp = await fetch('/api/auth/users', {
		method: 'POST',
		body: new URLSearchParams({
			name: data.get('name'),
			pass: data.get('pass')
		}).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})

	switch(resp.status) {
		case 200:
			handleSignup(await resp.json())
			break
		default:
			alert('Not today!')
	}
}

</script>

<template>
	<div :class="$style.wrapper">
		<Box>
			<form @submit.prevent="submit" :class="$style.form">
				<h1>Sign up</h1>
				<label for="username">Username:</label><input type="text" name="name" required id="username">
				<label for="password">Password:</label><input type="password" name="pass" required id="password">
				<button type="submit" class="highlight-background">Sign up!</button>
			</form>
		</Box>
	</div>
	
</template>

<style module>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.form {
	min-height: 350px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 30px 10px;
}
.form h1 {
	color: hsl(214, 100%, 28%)
}
</style>
