import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import * as Tournament from '@/views/tournament'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
		path: '/',
    	name: 'home',
    	component: Home
    },
	{
		path: '/tournaments',
		name: 'tournaments',
		component: async () => import('@/views/Tournaments.vue')
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: async () => import('@/views/Dashboard.vue')
	},
	{
		path: '/tournaments/@:id',
		name: 'tournament',
		redirect: to => `/tournaments/@${to.params.id}/view`,
		children: [
			{
				path: 'view',
				component: async () => Tournament.View
			},
			{
				path: 'manage',
				component: async () => Tournament.Manage
			},
			{
				path: 'player-list',
				component: async () => Tournament.PlayerList
			}
		]
	},
	{
		path: '/tournaments/create',
		name: 'create',
		component: async () => import('@/views/Create.vue')
	}
  ]
})

export default router
