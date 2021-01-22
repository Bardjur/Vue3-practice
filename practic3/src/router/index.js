import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Tasks
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('../views/New.vue')
  },
  {
    path: '/task/:taskId',
    name: 'task',
    component: () => import('../views/Task.vue'),
    props: true
  },
  {
    path: '/:notFound(.*)', 
    name: 'notExist',
    component: () => import('../views/NotExist.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
