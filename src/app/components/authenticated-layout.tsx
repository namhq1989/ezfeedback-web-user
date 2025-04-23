import useAuthStore from '@/app/stores/auth-store'
import { Link, Navigate, Outlet, useNavigate } from 'react-router'

const AuthenticatedLayout = () => {
  const { isAuthenticated, setAuth } = useAuthStore()
  const navigate = useNavigate()

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  const handleSignOut = () => {
    setAuth(false)
    navigate('/signin')
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-primary p-4 text-primary-foreground flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Easy Feedback</h1>
        <button
          onClick={handleSignOut}
          className='px-4 py-1 bg-primary-foreground text-primary rounded-md hover:bg-primary-foreground/90'
        >
          Sign Out
        </button>
      </header>
      <div className='flex flex-1 overflow-hidden'>
        <aside className='w-64 bg-muted p-4'>
          <ul className='space-y-2'>
            <li>
              <Link
                to='/'
                className='block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/project'
                className='block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground'
              >
                Project
              </Link>
            </li>
          </ul>
        </aside>
        <main className='flex-1 p-6 overflow-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AuthenticatedLayout
