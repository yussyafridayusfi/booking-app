import api from './api.js'

export const bookingService = {
  createBooking(roomId, startDate, endDate) {
    return api.post('/bookings', {
      room_id: roomId,
      start_date: startDate,
      end_date: endDate
    })
  },

  getMyBookings() {
    return api.get('/bookings/my')
  },

  getBookingById(id) {
    return api.get(`/bookings/${id}`)
  },

  cancelBooking(id) {
    return api.delete(`/bookings/${id}`)
  },

  updateBooking(id, data) {
    return api.put(`/bookings/${id}`, data)
  }
}
