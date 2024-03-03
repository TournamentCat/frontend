import { ref, computed, unref } from 'vue'
import { defineStore } from 'pinia'

export const authStore = defineStore('auth', () => {
	const token = ref(null)
	const loggedIn = computed(() => unref(token) !== null)
	const logout = () => void (token.value = null)
	const login = newtoken => void (logout(), token.value = newtoken)

	return { token, loggedIn, login, logout }
})
