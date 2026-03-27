<script setup>
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.js'

const router = useRouter()
const isLoggedIn = authService.isAuthenticated()

const handleBrowseRooms = () => {
  router.push('/rooms')
}

const handleGetStarted = () => {
  if (isLoggedIn) {
    router.push('/rooms')
  } else {
    router.push('/register')
  }
}
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to Booking App</h1>
        <p>Find and book the perfect room for your stay</p>
        <button @click="handleGetStarted" class="btn btn-primary btn-lg">
          {{ isLoggedIn ? 'Browse Rooms' : 'Get Started' }}
        </button>
      </div>
    </section>

    <section class="features">
      <div class="features-container">
        <h2>Why Choose Us?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h3>Wide Selection</h3>
            <p>Browse hundreds of rooms to find the perfect match for your needs.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Get the best deals with our competitive pricing and special offers.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Secure & Safe</h3>
            <p>Your bookings and personal information are secure with us.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Instant Booking</h3>
            <p>Book your room in seconds with our quick and easy process.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-container">
        <h2>Ready to find your perfect room?</h2>
        <button @click="handleBrowseRooms" class="btn btn-secondary btn-lg">
          Browse Available Rooms
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.features {
  padding: 4rem 2rem;
  background-color: #f8f9fa;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-container h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.cta {
  background-color: #667eea;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: white;
  color: #667eea;
}

.btn-secondary:hover {
  background-color: #f0f0f0;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .features-container h2 {
    font-size: 1.8rem;
  }

  .cta h2 {
    font-size: 1.5rem;
  }
}
</style>
