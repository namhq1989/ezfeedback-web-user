import AuthenticatedLayout from '@/app/components/layout/authenticated-layout'
import CategoryPage from '@/app/pages/category-page'
import DashboardPage from '@/app/pages/dashboard-page'
import FeedbackPage from '@/app/pages/feedback-page'
import MemberPage from '@/app/pages/member-page'
import SettingPage from '@/app/pages/setting-page'
import SignInPage from '@/app/pages/sign-in-page'
import { Route, Routes } from 'react-router'

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path='/signin' element={<SignInPage />} />

      {/* Protected routes */}
      <Route path='/' element={<AuthenticatedLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='feedback' element={<FeedbackPage />} />
        <Route path='category' element={<CategoryPage />} />
        <Route path='member' element={<MemberPage />} />
        <Route path='setting' element={<SettingPage />} />
      </Route>
    </Routes>
  )
}

export default App
