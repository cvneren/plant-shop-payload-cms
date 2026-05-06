'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const FloatingAdminButton: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    // Check if user is logged in and has admin role
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/users/me', { signal: controller.signal })
        if (response.ok) {
          const data = await response.json()
          if (isMounted && data.user && data.user.roles?.includes('admin')) {
            setIsAdmin(true)
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Failed to check auth', error)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const toggleAdmin = () => {
    if (pathname.startsWith('/admin')) {
      router.push('/')
    } else {
      router.push('/admin')
    }
  }

  if (!isAdmin) return null

  const isAdminPage = pathname.startsWith('/admin')

  return (
    <button
      onClick={toggleAdmin}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#334537] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none"
      title={isAdminPage ? 'Go to Storefront' : 'Go to Admin Panel'}
      aria-label={isAdminPage ? 'Go to Storefront' : 'Go to Admin Panel'}
    >
      {isAdminPage ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )}
    </button>
  )
}

export default FloatingAdminButton
