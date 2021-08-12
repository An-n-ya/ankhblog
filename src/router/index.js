import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import page404 from '../views/404.vue'
import Resources from '../views/Resources.vue'
import UI from '../views/UI.vue'
import Gallery from '../views/Gallery.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
  },
  {
    path: '/ui',
    name: 'UI',
    component: UI,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: "/post/:article",
    component: Home
  },
  {
    path: '*',
    name: '404',
    component: page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
