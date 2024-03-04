import { ref, computed, unref } from 'vue'
import { defineStore } from 'pinia'

export const tournamentStore = defineStore('tournament', () => {
	const name = ref('')
	const id = ref()
	const setName = newName => void (name.value = newName)
	const setId = newId => void (id.value = newId)

	return { name, setName, id, setId }
})
