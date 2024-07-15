import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth/'

interface RegisterProps {
  username: string
  email: string
  password: string
}

interface LoginProps {
  email: string
  password: string
}

const register = ({ username, email, password }: RegisterProps) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  })
}

const login = ({ email, password }: LoginProps) => {
  return axios
    .post(API_URL + 'signin', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
  return axios.post(API_URL + 'signout').then((response) => {
    return response.data
  })
}

const getCurrentUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user'))
  }
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService
