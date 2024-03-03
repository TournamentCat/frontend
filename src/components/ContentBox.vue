<script setup>

import Box from './Box.vue'
import Heading from './Heading.vue'

defineProps({
	heading: {
		type: String,
		required: true
	},
	headingLevel: {
		type: [Number, String],
		default: 2
	}
})

</script>

<template>
	<Box>
		<Heading :level="headingLevel">{{ heading }}</Heading>
		<slot></slot>
	</Box>
</template>

