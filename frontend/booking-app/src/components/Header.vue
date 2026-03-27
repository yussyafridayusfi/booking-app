<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.js'

const router = useRouter()
const user = ref(authService.getUser())
const isLoggedIn = computed(() => authService.isAuthenticated())

const logout = () => {
  authService.logout()
  user.value = null
  router.push('/login')
}


</script>

<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <RouterLink to="/" class="logo-text">📱 Booking App</RouterLink>
        </div>
        <ul class="nav-links">
          <li><RouterLink to="/" class="nav-link">Home</RouterLink></li>
          <li><RouterLink to="/rooms" class="nav-link">Rooms</RouterLink></li>
          <li v-if="isLoggedIn"><RouterLink to="/my-bookings" class="nav-link">My Bookings</RouterLink></li>
          <li v-if="!isLoggedIn"><RouterLink to="/login" class="nav-link">Login</RouterLink></li>
          <li v-if="!isLoggedIn"><RouterLink to="/register" class="nav-link nav-link-primary">Sign Up</RouterLink></li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="nav-link nav-link-danger">Logout</button>
          </li>
        </ul>
        <div v-if="isLoggedIn" class="user-info">
          {{ user?.name }}
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  background-color: #fff;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
}

.logo-text {
  color: #333;
  text-decoration: none;
}

.logo-text:hover {
  color: #007bff;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font: inherit;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link-primary {
  background-color: #007bff;
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link-primary:hover {
  background-color: #0056b3;
  color: white !important;
}

.nav-link-danger {
  background-color: #dc3545;
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link-danger:hover {
  background-color: #c82333;
  color: white !important;
}

.user-info {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .nav-links {
    gap: 1rem;
  }
  
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
