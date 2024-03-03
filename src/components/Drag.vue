<script setup>
import onMouseMove from '@/utils/onMouseMove'
import { ref, unref, onMounted, reactive, computed } from 'vue'
import * as mouse from '@/utils/mousePressed'

defineProps({
	width: {
		type: String,
		default: '100%'
	},
	height: {
		type: String,
		default: '100%'
	}
})

const box = ref(null)
const pos = reactive({
	x: 0,
	y: 0
})
const top = computed(() => `${-pos.y}px`)
const left = computed(() => `${-pos.x}px`)
const start = {
	initial: { x: pos.y, y: pos.y },
	x: 0,
	y: 0,
	diff({ x, y }) {
		return { x: this.x - x, y: this.y - y }
	},
	get cleared() {
		return this.x === 0 && this.y === 0
	},
	clear() {
		if(this.cleared) return

		this.x = 0
		this.y = 0
		console.log('cleared')
	},
	calculate({ x, y }) {
		if(!this.cleared) return

		this.initial.x = pos.x
		this.initial.y = pos.y
		this.x = x
		this.y = y
	}
}
let startClear = true
function calculateStart({ x, y }) {
	if(!startClear) return

	startClear = false
	start.x = x
	start.y = y
}
function clearStart() {
	if(startClear) return

	start.x = 0
	start.y = 0
}
function calculateXY([ mouseX , mouseY ], element) {
	const { left: boxX, top: boxY } = element.getBoundingClientRect()
	const x = mouseX - boxX
	const y = mouseY - boxY
	start.calculate({ x: x, y: y })
	const diff = start.diff({ x, y })
	pos.x = diff.x + start.initial.x
	pos.y = diff.y + start.initial.y 
}

onMounted(() => {
	window.addEventListener('mousedown', mouse.press)
	window.addEventListener('mouseup', mouse.release)

	onMouseMove((...mouseXY) => {
		if(!mouse.isPressed()) {
			start.clear()
		} else {
			calculateXY(mouseXY, box.value)
		}
	}, unref(box))
})

</script>

<template>
	<div :class="$style.wrapper" ref="box">
		<div :class="$style.content"><slot></slot></div>
	</div>
</template>

<style module>
.wrapper {
	height: v-bind(height);
	width: v-bind(width);
	overflow: hidden;
	cursor: grab;
	position: relative;
}
.content {
	position: absolute;
	top: v-bind(top);
	left: v-bind(left)
}
.wrapper:active {
	cursor: grabbing;
}
</style>
