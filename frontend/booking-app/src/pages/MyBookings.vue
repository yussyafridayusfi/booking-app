<script setup>
import { ref, onMounted } from 'vue'
import { bookingService } from '../services/booking.js'

const bookings = ref([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  await fetchBookings()
})

const fetchBookings = async () => {
  loading.value = true
  error.value = ''
  try {
    bookings.value = await bookingService.getMyBookings()
  } catch (err) {
    error.value = 'Failed to load bookings. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const cancelBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to cancel this booking?')) {
    return
  }

  try {
    await bookingService.cancelBooking(bookingId)
    bookings.value = bookings.value.filter(b => b.id !== bookingId)
  } catch (err) {
    error.value = 'Failed to cancel booking. Please try again.'
    console.error(err)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusBadgeClass = (status) => {
  const statusMap = {
    'PENDING': 'badge-warning',
    'CONFIRMED': 'badge-success',
    'CANCELLED': 'badge-danger',
    'COMPLETED': 'badge-info'
  }
  return statusMap[status] || 'badge-secondary'
}
</script>

<template>
  <div class="bookings-page">
    <div class="bookings-container">
      <h1>My Bookings</h1>
      <p class="subtitle">View and manage your room bookings</p>

      <div v-if="loading" class="loading">Loading bookings...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="bookings.length === 0" class="alert alert-info">
        You don't have any bookings yet.
        <RouterLink to="/rooms">Browse available rooms</RouterLink>
      </div>
      <div v-else class="bookings-list">
        <div v-for="booking in bookings" :key="booking.id" class="booking-card">
          <div class="booking-header">
            <h3>Room Booking</h3>
            <span :class="['badge', getStatusBadgeClass(booking.status)]">
              {{ booking.status }}
            </span>
          </div>
          <div class="booking-details">
            <div class="detail-row">
              <span class="label">Booking ID:</span>
              <span class="value">{{ booking.id }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Room ID:</span>
              <span class="value">{{ booking.room_id }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-in:</span>
              <span class="value">{{ formatDate(booking.start_date) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Check-out:</span>
              <span class="value">{{ formatDate(booking.end_date) }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Booked on:</span>
              <span class="value">{{ formatDate(booking.createddate) }}</span>
            </div>
          </div>
          <div class="booking-actions">
            <button
              v-if="booking.status === 'PENDING'"
              @click="cancelBooking(booking.id)"
              class="btn btn-danger"
            >
              Cancel Booking
            </button>
            <span v-else class="status-locked">Cannot modify this booking</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookings-page {
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 80vh;
}

.bookings-container {
  max-width: 900px;
  margin: 0 auto;
}

.bookings-container h1 {
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
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

.alert-info a {
  color: #0c5460;
  font-weight: 600;
}

.bookings-list {
  display: grid;
  gap: 1.5rem;
}

.booking-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.booking-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.booking-header h3 {
  margin: 0;
  color: #333;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge-warning {
  background-color: #fff3cd;
  color: #856404;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.badge-info {
  background-color: #d1ecf1;
  color: #0c5460;
}

.badge-secondary {
  background-color: #e2e3e5;
  color: #383d41;
}

.booking-details {
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #666;
}

.detail-row .label {
  font-weight: 600;
  color: #333;
}

.detail-row .value {
  text-align: right;
}

.booking-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.status-locked {
  color: #999;
  font-style: italic;
}

@media (max-width: 768px) {
  .bookings-container h1 {
    font-size: 1.5rem;
  }

  .detail-row {
    flex-direction: column;
  }

  .detail-row .value {
    text-align: left;
    margin-top: 0.25rem;
  }
}
</style>
