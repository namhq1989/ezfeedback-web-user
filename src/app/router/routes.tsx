import AuthGuard from '@/app/components/auth/auth-guard'
import AuthenticatedLayout from '@/app/components/layout/authenticated-layout'
import AccountPage from '@/app/pages/account'
import AdminPage from '@/app/pages/admin'
import BillingPage from '@/app/pages/billing'
import DashboardPage from '@/app/pages/dashboard'
import FeedbackPage from '@/app/pages/feedback'
import NotificationPage from '@/app/pages/notification'
import PricingPage from '@/app/pages/pricing'
import SignInPage from '@/app/pages/sign-in'
import SupportPage from '@/app/pages/support'
import { ROUTES, getDefaultDashboardRoute } from '@/app/router/route-constants'
import UserMenuLayout from '@/app/router/user-menu-layout'
import { Braces, LayoutDashboard, Send } from 'lucide-react'
import { ElementType, JSX } from 'react'
import { Navigate } from 'react-router'

export interface AppRoute {
  path?: string
  index?: boolean
  element: JSX.Element
  breadcrumb: string
  navigation?: {
    label: string
    icon?: ElementType
  }
  children?: AppRoute[]
  isPublic?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    element: (
      <AuthGuard>
        <AuthenticatedLayout />
      </AuthGuard>
    ),
    breadcrumb: '',
    navigation: undefined,
    isPublic: false,
    children: [
      {
        element: <UserMenuLayout />,
        breadcrumb: '',
        navigation: undefined,
        children: [
          {
            path: ROUTES.ACCOUNT.substring(1), // Remove leading slash
            element: <AccountPage />,
            breadcrumb: 'navigation.account',
            navigation: undefined,
          },
          {
            path: ROUTES.BILLING.substring(1), // Remove leading slash
            element: <BillingPage />,
            breadcrumb: 'navigation.billing',
            navigation: undefined,
          },
          {
            path: ROUTES.NOTIFICATION.substring(1), // Remove leading slash
            element: <NotificationPage />,
            breadcrumb: 'navigation.notification',
            navigation: undefined,
          },
          {
            path: ROUTES.SUPPORT.substring(1), // Remove leading slash
            element: <SupportPage />,
            breadcrumb: 'navigation.support',
            navigation: undefined,
          },
        ],
      },
      {
        path: ROUTES.PRICING.substring(1), // Remove leading slash
        element: <PricingPage />,
        breadcrumb: 'navigation.pricing',
        navigation: undefined,
      },
    ],
  },
  {
    path: ROUTES.ROOT,
    element: (
      <AuthGuard>
        <Navigate to={getDefaultDashboardRoute()} replace />
      </AuthGuard>
    ),
    breadcrumb: '',
    navigation: undefined,
    isPublic: false,
  },
  {
    path: ROUTES.SIGN_IN,
    element: (
      <AuthGuard requireAuth={false}>
        <SignInPage />
      </AuthGuard>
    ),
    breadcrumb: 'navigation.signin',
    isPublic: true,
    navigation: undefined,
  },
  {
    path: `${ROUTES.PROJECT}/:slug`,
    element: (
      <AuthGuard>
        <AuthenticatedLayout />
      </AuthGuard>
    ),
    breadcrumb: 'navigation.dashboard',
    navigation: { label: 'navigation.dashboard', icon: LayoutDashboard },
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
        breadcrumb: 'navigation.dashboard',
        navigation: { label: 'navigation.dashboard', icon: LayoutDashboard },
      },
      {
        path: 'feedback',
        element: <FeedbackPage />,
        breadcrumb: 'navigation.feedback',
        navigation: { label: 'navigation.feedback', icon: Send },
      },
      {
        path: 'admin',
        element: <AdminPage />,
        breadcrumb: 'navigation.admin',
        navigation: { label: 'navigation.admin', icon: Braces },
      },
    ],
  },
]
