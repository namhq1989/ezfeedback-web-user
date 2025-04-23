import { Route, Routes } from 'react-router'
import AuthenticatedLayout from './app/components/authenticated-layout'
import HomePage from './app/pages/home-page'
import ProjectPage from './app/pages/project-page'
import SignInPage from './app/pages/sign-in-page'

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path='/signin' element={<SignInPage />} />

      {/* Protected routes */}
      <Route path='/' element={<AuthenticatedLayout />}>
        <Route index element={<HomePage />} />
        <Route path='project' element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}

export default App
