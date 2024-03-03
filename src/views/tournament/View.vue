<script setup>

import Box from '@/components/Box.vue'
import Tournament from './Tournament.vue'
import Zoom from '@/components/Zoom.vue'
import { onZoomInOut } from '@/stores/zoom'
import ZoomButton from '@/components/ZoomButton.vue'
import Drag from '@/components/Drag.vue'
import { ref, unref, onMounted, reactive } from 'vue'
import data from '@/assets/data.json' with { type: 'json' }

const join = ref(null)
const brackets = ref(null)

function showJoin() {}
function showBrackets() {}

const drag = reactive({
	width: '',
	height: ''
})
function dragRelative() {
	drag.width = '100%'
	drag.height = '100%'
}
function dragFixed() {
	drag.width = '1100px'
	drag.height = 'calc(100vh - 900px)'
}
dragRelative()
const zoomId = ref('tournament')

// onZoomInOut(
// 	unref(zoomId),
// 	dragRelative,
// 	dragFixed
// )

onMounted(() => {
	brackets.value.dataset.active = true

	window.bracketsViewer.render({
		stages: data.stage,
		matches: data.match,
		matchGames: data.match_game,
		participants: data.participant,
	});
})

</script>

<template>
	<Tournament view="General">
		<Box>
			<div ref="join" :class="$style.part">Join</div>
			<div ref="brackets" :class="$style.part">
				<Zoom :name="zoomId" :class="$style.zoom">
					<ZoomButton :for="zoomId" mode="IN" :class="$style.zoomIn">[+]</ZoomButton>
						<div :class="$style['brackets-wrapper']">
							<Drag :class="$style.drag" :width="drag.width" :height="drag.height">
								<div class="brackets-viewer"></div>
							</Drag>
						</div>
					
				</Zoom>
			</div>
			
		</Box>
	</Tournament>
</template>

<style module>
.drag{
	position: relative;
}
.part {
	display: none;
	width: 100%;
	height: 100%;
}
.part[data-active='true'] {
	display: inherit;
}
.zoom[data-zoomed='true'] {
	padding: 10px;
}
.zoom[data-zoomed='true'] .brackets-wrapper {
	background-color: white;
	border-radius: 10px;
}
.brackets-wrapper {
	height: 100%;
	width: 100%;
}
.zoomIn {
	position: absolute;
	right: 10px;
	top: 10px;
	width: 40px;
	height: 40px;
	z-index: 2;
}
</style>
<style>
.brackets-viewer {
	border-radius: 10px;
	z-index: 1;
}
</style>
