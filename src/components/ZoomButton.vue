<script setup>

import { toggle, zoomIn, zoomOut, onZoomInOut, get } from '@/stores/zoom'
import { computed, unref, ref } from 'vue'

const props = defineProps({
	for: {
		type: String,
		required: true
	},
	mode: {
		type: String,
		default: "INOUT",
		validator: v => ['IN', 'OUT', 'INOUT'].indexOf(v) !== -1
	},
	hide: {
		type: Boolean,
		default: true
	}
})

const fn = computed(() => (props.mode === 'IN' ? zoomIn : props.mode === 'OUT' ? zoomOut : toggle))
const btncb = () => unref(fn)(props.for)

const hidden = ref(false)
if(props.hide) {
	hidden.value = props.mode !== 'INOUT' && get(props.for) === (props.mode === 'IN')
	onZoomInOut(
		props.for,
		() => void (hidden.value = props.mode === 'IN'),
		() => void (hidden.value = props.mode === 'OUT')
	)
}


</script>

<template>
	<button @click="btncb" :class="[hidden ? $style.hidden : '']"><slot></slot></button>
</template>

<style module>
.hidden {
	display: none;
}
</style>
<style scoped>
button {
	cursor: pointer
}
</style>
