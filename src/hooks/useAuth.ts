import { AuthContext } from '@/lib/auth-context'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}