import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import RoomsView from '../views/RoomView.vue'
import BookingsView from '../views/BookingView.vue'
import MyBookingsView from '../views/MyBookingView.vue'

const routes = [
    {path: "/", component : LoginView},
    {path: "/register", component : RegisterView},
    {path: "/dashboard", component : DashboardView},
    {path: "/rooms", component : RoomsView},
    {path: "/bookings", component : BookingsView},
    {path: "/my-bookings", component : MyBookingsView}
];

const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;