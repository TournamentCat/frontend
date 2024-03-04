<script setup>

import Box from '@/components/Box.vue'
import { RouterLink } from 'vue-router'

</script>

<template>
	
	<div :class="$style.wrapper">
		<Box :class="$style.box">
			<strong class="highlight-text">https://t.hanna.gg/</strong>
			<span>https://github.com/TournamentCat/frontend</span>
			<span>https://github.com/TournamentCat/backend</span>
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
.box {
	padding: 30px !important;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	font-size: 1.5em;
}
</style>
