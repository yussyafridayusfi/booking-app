<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { roomService } from '../services/room.js'

const router = useRouter()
const rooms = ref([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  await fetchRooms()
})

const fetchRooms = async () => {
  loading.value = true
  error.value = ''
  try {
    rooms.value = await roomService.getAllRooms()
  } catch (err) {
    error.value = 'Failed to load rooms. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const selectRoom = (roomId) => {
  router.push(`/booking/${roomId}`)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
</script>

<template>
  <div class="rooms-page">
    <div class="rooms-container">
      <h1>Available Rooms</h1>
      <p class="subtitle">Choose from our selection of comfortable rooms</p>

      <div v-if="loading" class="loading">Loading rooms...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="rooms.length === 0" class="alert alert-info">
        No rooms available at the moment. Please try again later.
      </div>
      <div v-else class="rooms-grid">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <div class="room-image">
            <img
              :src="`https://via.placeholder.com/300x200?text=${encodeURIComponent(room.name)}`"
              :alt="room.name"
            />
          </div>
          <div class="room-details">
            <h3>{{ room.name }}</h3>
            <p class="room-description">{{ room.description }}</p>
            <div class="room-info">
              <span class="capacity">👥 {{ room.capacity }} guests</span>
              <span class="price">{{ formatPrice(room.price_per_night) }}/night</span>
            </div>
            <button @click="selectRoom(room.id)" class="btn btn-primary btn-block">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rooms-page {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 80vh;
}

.rooms-container {
  max-width: 1200px;
  margin: 0 auto;
}

.rooms-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.room-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.room-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.room-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-details {
  padding: 1.5rem;
}

.room-details h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.room-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
  height: 2.7em;
  overflow: hidden;
}

.room-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.capacity {
  color: #666;
  font-size: 0.9rem;
}

.price {
  color: #007bff;
  font-weight: 600;
  font-size: 1.1rem;
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
  width: 100%;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-block {
  width: 100%;
}

@media (max-width: 768px) {
  .rooms-grid {
    grid-template-columns: 1fr;
  }

  .rooms-container h1 {
    font-size: 1.5rem;
  }
}
</style>
