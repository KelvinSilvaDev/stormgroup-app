import { jwtDecode } from 'jwt-decode'
import api from './api'

type TokenPayload = {
  role: 'USER' | 'ADMIN'
}

export const login = async (credentials: unknown) => {
  const response = await api.post('login', credentials)
  localStorage.setItem('token', response.data.access_token)
  return response.data
}

export const register = async (params: unknown) => {
  const response = await api.post('users', params)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

export const getRole = (): 'USER' | 'ADMIN' | null => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = jwtDecode<TokenPayload>(token)
    return decodedToken.role
  }
  return null
}
