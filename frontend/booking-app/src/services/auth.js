import api from './api.js'

export const authService = {
  login(email, password) {
    return api.post('/auth/login', { email, password })
  },

  register(email, password, name) {
    return api.post('/auth/register', { email, password, name })
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  setToken(token) {
    localStorage.setItem('token', token)
  },

  getToken() {
    return localStorage.getItem('token')
  },

  isAuthenticated() {
    return !!this.getToken()
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
