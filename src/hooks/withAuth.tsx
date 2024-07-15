/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRole, isAuthenticated } from '@/service/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const withAuth = (
  WrappedComponent: React.ComponentType,
  requiredRole?: 'USER' | 'ADMIN',
) => {
  return (props: any) => {
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login')
      } else if (requiredRole && getRole() !== requiredRole) {
        router.push('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
