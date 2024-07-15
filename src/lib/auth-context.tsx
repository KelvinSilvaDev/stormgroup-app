'use client'
import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

type AuthContextType = {
  user: { id: number; role: string } | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: number; role: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode<{ id: number; role: string }>(token)
      setUser({ id: decodedToken.id, role: decodedToken.role })
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    const decodedToken = jwtDecode<{ id: number; role: string }>(token)
    setUser({ id: decodedToken.id, role: decodedToken.role })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
