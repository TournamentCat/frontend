<script setup>

import Box from '@/components/Box.vue'
import ContentBox from '@/components/ContentBox.vue'
import { RouterLink } from 'vue-router'

</script>

<template>
	<div :class="$style.layout">
		<h1>Dashboard</h1>
		<ContentBox heading="User tools">I DUNNO</ContentBox>
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
