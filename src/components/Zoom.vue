<script setup>

import { onToggle, set, onZoomOut, get } from '@/stores/zoom'
import { ref, unref } from 'vue'
import ZoomButton from './ZoomButton.vue'
import onMouseMove from '@/utils/onMouseMove'

const props = defineProps({
	name: {
		type: String,
		required: true
	},
	ontoggle: {
		type: Function
	},
	initial: {
		type: Boolean,
		default: false
	}
})

set(props.name, props.initial)

const zoomed = ref(get(props.name))

onToggle(
	props.name, 
	() => void (zoomed.value = !zoomed.value)
)

if(props.ontoggle) onToggle(
	props.name,
	() => void props.ontoggle()
)

const mouseClose = ref(false)
onZoomOut(
	props.name,
	() => mouseClose.value = false
)
onMouseMove((x, y) => {
	if(!unref(zoomed)) return
	mouseClose.value = (y < 100 && Math.abs((window.innerWidth / 2 - x)) < 200)
})

</script>

<template>
	<div :class="$style.wrapper" :data-zoomed="zoomed">
		<div>
			<div :class="$style.escape" :data-mouse-close="mouseClose"><ZoomButton :for="name" mode="OUT" :hide="false" :class="$style.exitbtn">[-]</ZoomButton></div>
			<div :class="[$style.content]"><slot></slot></div>
		</div>
	</div>
</template>

<style module>
.wrapper, .wrapper > div {
	width: 100%;
	height: 100%;
}
.wrapper[data-zoomed='true'] {
	position: absolute;
	inset: 0;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.wrapper > div {
	position: relative;
}
.escape {
	display: none;
	transform: translateY(-100px);
}
.wrapper[data-zoomed='true'] .escape {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 999999;
	top: 0;
	left: 0;
	width: 100%;
	height: fit-content;
	transform: translateY(-100px);
	transition: .3s;
}
.wrapper[data-zoomed='true'] .escape[data-mouse-close='true'] {
	transform: translateY(10px);
}
.content {
	width: 100%;
	height: 100%;
	overflow: auto;
}
.exitbtn {
	width: 40px;
	height: 40px;
}
</style>
