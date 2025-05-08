import { ROUTES, getDefaultDashboardRoute } from '@/app/router/route-constants'
import useAuthStore from '@/app/stores/auth'
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

interface IAuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
}

const AuthGuard = ({ children, requireAuth = true }: IAuthGuardProps) => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  // If authentication is required but user is not authenticated, redirect to sign-in
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />
  }

  // If user is authenticated but accessing a public route like sign-in, redirect to dashboard
  if (!requireAuth && isAuthenticated()) {
    return <Navigate to={getDefaultDashboardRoute()} replace />
  }

  // If authentication requirements are met, render the children
  return <>{children}</>
}

export default AuthGuard
