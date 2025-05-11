import { Spinner } from '@/app/components/root'
import useAuthStore from '@/app/stores/auth'
import useProjectStore from '@/app/stores/project'
import { ReactNode, useEffect, useState } from 'react'

interface IAuthDataProviderProps {
  children: ReactNode
}

const AuthDataProvider = ({ children }: IAuthDataProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
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
        // signOut()
        // setAuthError(true)
        setIsLoading(false)
      }
    }

    loadAuthData()
  }, [getMe, getProjects, signOut])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner size='lg' />
      </div>
    )
  }

  return <>{children}</>
}

export default AuthDataProvider
