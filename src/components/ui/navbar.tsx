'use client'
// components/ui/navbar.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from './button'

import { useRouter } from 'next/navigation'
import { getRole, isAuthenticated, logout } from '@/service/auth'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [auth, setAuth] = useState(false)
  const [role, setRole] = useState<'USER' | 'ADMIN' | null>(null)
  const router = useRouter()

  useEffect(() => {
    setAuth(isAuthenticated())
    setRole(getRole())
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    setAuth(false)
    setRole(null)
    router.push('/login')
  }

  return (
    <nav className="shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              MyApp
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              {auth && role === 'ADMIN' && (
                <Link
                  href="/add-movie"
                  className="rounded-md px-3 py-2 text-sm font-medium"
                >
                  Admin
                </Link>
              )}
              {auth && (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </Button>
                </>
              )}
              {!auth && (
                <>
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            {auth && role === 'ADMIN' && (
              <Link
                href="/admin"
                className="block rounded-md px-3 py-2 text-base font-medium"
              >
                Admin
              </Link>
            )}
            {auth && (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={handleLogout}
                  className="w-full rounded-md px-3 py-2 text-left text-base font-medium"
                >
                  Logout
                </Button>
              </>
            )}
            {!auth && (
              <>
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
