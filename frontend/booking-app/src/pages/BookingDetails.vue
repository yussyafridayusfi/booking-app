<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { bookingService } from '../services/booking.js'

const router = useRouter()
const route = useRoute()
const roomId = route.params.roomId

const startDate = ref('')
const endDate = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleBooking = async () => {
  if (!startDate.value || !endDate.value) {
    error.value = 'Please select both check-in and check-out dates'
    return
  }

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)

  if (start >= end) {
    error.value = 'Check-out date must be after check-in date'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await bookingService.createBooking(roomId, startDate.value, endDate.value)
    success.value = 'Booking created successfully!'
    setTimeout(() => {
      router.push('/my-bookings')
    }, 1500)
  } catch (err) {
    error.value = err.message || 'Failed to create booking. Please try again.'
  } finally {
    loading.value = false
  }
}

const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}
</script>

<template>
  <div class="booking-page">
    <div class="booking-container">
      <h1>Complete Your Booking</h1>
      <p class="subtitle">Room ID: {{ roomId }}</p>

      <div class="booking-card">
        <form @submit.prevent="handleBooking" class="form">
          <div class="form-group">
            <label for="start-date">Check-in Date</label>
            <input
              id="start-date"
              v-model="startDate"
              type="date"
              class="form-input"
              :min="getTodayDate()"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="end-date">Check-out Date</label>
            <input
              id="end-date"
              v-model="endDate"
              type="date"
              class="form-input"
              :min="getTodayDate()"
              :disabled="loading"
            />
          </div>

          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <div v-if="success" class="alert alert-success">{{ success }}</div>

          <button type="submit" class="btn btn-primary btn-block btn-lg" :disabled="loading">
            {{ loading ? 'Processing...' : 'Confirm Booking' }}
          </button>

          <button
            type="button"
            @click="router.back()"
            class="btn btn-secondary btn-block"
            :disabled="loading"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.booking-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f8f9fa;
}

.booking-container {
  width: 100%;
  max-width: 500px;
}

.booking-container h1 {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.booking-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.alert {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  margin-top: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  width: 100%;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  width: 100%;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}
</style>
