<script setup>

import Box from '@/components/Box.vue'
import { RouterLink } from 'vue-router'
import Heading from '@/components/Heading.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';

const route = useRoute()

const id = ref(route.params.id)

watch(
	() => route.params.id,
	newId => id.value = newId
)

defineProps({
	view: {
		type: String,
		required: true
	}
})

</script>

<template>
	<div :class="$style.layout">
		<Heading level=1>Tournament {{ id }} - {{ view }}</Heading>
		<Box>
			<ul role="list" :class="$style.navigation">
				<li><RouterLink to="view">General</RouterLink></li>
				<li><RouterLink to="player-list">Player List</RouterLink></li>
			</ul>
		</Box>
		<slot></slot>
	</div>
</template>

<style module>
.layout {
	height: fit-content;
	min-height: 100%;
	display: grid;
	gap: 10px;
	grid-template-rows: auto 60px 1fr;
}
.navigation {
	display: flex;
	justify-content: space-around;
	width: 100%;
	height: 100%;
	align-items: center;
}
</style>
