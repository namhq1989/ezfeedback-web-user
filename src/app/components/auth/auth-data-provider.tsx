import { ROUTES } from '@/app/router/route-constants'
import useAuthStore from '@/app/stores/auth'
import useProjectStore from '@/app/stores/project'
import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router'

interface IAuthDataProviderProps {
  children: ReactNode
}

const AuthDataProvider = ({ children }: IAuthDataProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(false)
  const { getMe, signOut } = useAuthStore()
  const { getProjects } = useProjectStore()

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        // Step 1: Get user info
        await getMe()

        // Step 2: Get projects
        await getProjects()

        setIsLoading(false)
      } catch (error) {
        // If getMe fails, sign out
        signOut()
        setAuthError(true)
        setIsLoading(false)
      }
    }

    loadAuthData()
  }, [getMe, getProjects, signOut])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-xl h-12 w-12 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (authError) {
    return <Navigate to={ROUTES.SIGN_IN} replace />
  }

  return <>{children}</>
}

export default AuthDataProvider
