import api from './api.js'

export const roomService = {
  getAllRooms() {
    return api.get('/rooms')
  },

  getRoomById(id) {
    return api.get(`/rooms/${id}`)
  },

  searchRooms(filters) {
    const params = new URLSearchParams(filters).toString()
    return api.get(`/rooms?${params}`)
  }
}
