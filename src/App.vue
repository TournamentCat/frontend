<script setup>

import { RouterLink, RouterView } from 'vue-router'
import { authStore } from '@/stores/auth'
import { watch, ref, unref, computed } from 'vue'
import getName from '@/utils/getName'

const auth = authStore()

const userLogin = computed(() => auth.loggedIn)
const username = ref('')

const authChange = token => {
	if(!auth.loggedIn) return

	username.value = getName(token)
}

watch(
	() => auth.token,	 
	authChange
)

const logout = () => auth.logout()

</script>

<template>
	<div :class="$style.layout">
		<div :class="$style.bg"></div>
		<div :class="$style.content">
			<header :class="$style.header"><div :class="$style.wrapper">
				<div>
					<a href="/"><img src="/images/logo.png"></a>
				</div>
				<nav>
					<ul role="list">
						<li><RouterLink to="/">Home</RouterLink></li>
						<li><RouterLink to="/tournaments">Search</RouterLink></li>
						<li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
					</ul>
				</nav>
				<div :class="$style.user" :data-logged-in="userLogin">
					<div><RouterLink to="/login">Log in</RouterLink><RouterLink to="/signup">Sign up</RouterLink></div>
					<div><span :class="$style.username">{{ username }}</span><a :class="$style.logout" @click.prevent="logout">log out</a></div>
				</div>
			</div></header>
			<main :class="$style.main"><RouterView /></main>
			<footer :class="$style.footer">
				<p>Copyright (c) 2024, me. - All rights reserved.</p>
				<ul role="list">
					<li><a href="/terms">Terms and Conditions</a></li>
					<li><a href="/cookies">Cookie Policy</a></li>
					<li><a href="/privacy">Privacy Policy</a></li>
				</ul>
			</footer>
		</div>
		
	</div>
</template>

<style module>
.user > * {
	display: none;
}
.user[data-logged-in='false'] > *:nth-child(1) {
	display: flex;
	gap: 10px;

	& a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
}
.user[data-logged-in='true'] > *:nth-child(2) {
	display: block;
}
.logout {
	display: inline-block;
	margin-left: 5px;
	text-decoration: underline;
	color: lightblue;
	cursor: pointer;
}
.username {
	font-weight: bold;
}

.max {
	width: 100%;
	min-height: 100%;
	height: fit-content;
}
.layout {
	composes: max;
	height: 100%;
}
.content {
	display: grid;
	grid-template-rows: 80px 1fr auto;
	gap: 10px;

	composes: max;
}
.bg {
	position: fixed;
	inset: 0;
	width: 100vw;
	height: 100vh;

	background-image: linear-gradient(to bottom right, hsl(240, 100%, 70%), hsl(207, 100%, 72%));
	z-index: -1;
}
.wrapper {
	margin: auto;
	padding: 0 5px;
	width: 100%;
	min-height: 100%;
	max-width: min(1205px, 100vw);
}
.main {
	composes: max wrapper;
	height: 100%;
}
.header {
	background-image: linear-gradient(to bottom, hsl(214, 100%, 22%), hsla(231, 100%, 22%, 0.301));
	color: white;
}
.header > div.wrapper {
	display: grid;
	gap: 10px;
	grid-template-columns: 60px 1fr auto;
	align-items: center;
}
.header > div.wrapper > * {
	display: inline-block;
}
.header img {
	width: 100%;
	aspect-ratio: 1 / 1;
}
.header nav {
	font-weight: bold;
	margin-left: 10px
}
.header nav ul {
	display: flex;
	gap: 10px;

	& a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
}
.footer {
	composes: wrapper;
	text-align: center;
	padding: 10px;
	font-size: 1rem;
	padding-top: 0;
}
.footer > ul {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
</style>

<style>
h1 {
	text-align: center;
	color: white;
}
</style>

<style scoped>
a.router-link-active {
	color: hsl(192, 92%, 85%)
}
</style>
