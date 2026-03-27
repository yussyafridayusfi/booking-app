import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Rooms from '../pages/Rooms.vue'
import BookingDetails from '../pages/BookingDetails.vue'
import MyBookings from '../pages/MyBookings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login', requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register', requiresAuth: false }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    meta: { title: 'Browse Rooms' }
  },
  {
    path: '/booking/:roomId',
    name: 'BookingDetails',
    component: BookingDetails,
    meta: { title: 'Book Room', requiresAuth: true }
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: MyBookings,
    meta: { title: 'My Bookings', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Booking App`
  next()
})

export default router
