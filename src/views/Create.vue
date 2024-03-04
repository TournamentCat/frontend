<script setup>

import Box from '@/components/Box.vue'
import Heading from '@/components/Heading.vue'
import router from '@/router';

const submit = async event => {
	const data = new FormData(event.target)
	console.log(data)

	const resp = await fetch('/api/tournaments', {
		method: 'POST',
		body: new URLSearchParams({
			name: data.get('name'),
			spots: data.get('spots'),
			type: data.get('type')
		}).toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	
	switch(resp.status) {
		case 200:
		case 201:
		case 204:
			const { id } = await resp.json()
			router.push(`/tournaments/@${id}/manage`)
			break
		default:
			console.log('error', await resp.text())
	}
}

</script>

<template>
	<div :class="$style.layout">
		<Heading level="1">Create Tournament</Heading>
		<Box>
			<form @submit.prevent="submit">
				<div>
					<label for="name">Name: </label>
					<input type="text" name="name" id="name" required>
				</div>
				<div>
					<label for="type">Type: </label>
					<select name="type" id="type">
						<option value="single" selected>Single Elimination</option>
						<option value="double" disabled>Double Elimination</option>
						<option value="swiss" disabled>Swiss</option>
					</select>
				</div>
				<div>
					<label for="participants">Number of participants</label>
					<select name="spots" id="participants">
						<option value="4">4</option>
						<option value="8">8</option>
						<option value="16" selected>16</option>
						<option value="32">32</option>
						<option value="64" disabled>64</option>
					</select>
				</div>
				<button type="submit" class="highlight-background">Create</button>
			</form>
		</Box>
	</div>
</template>

<style module>
.layout {
	height: 100%;
	display: grid;
	grid-template-rows: auto 1fr;
	gap: 10px;
}
</style>
