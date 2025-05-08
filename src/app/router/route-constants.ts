/**
 * Route constants for the application
 * Use these constants instead of hardcoded strings to avoid typos and make refactoring easier
 */

export const ROUTES = {
  // Auth routes
  SIGN_IN: '/signin',

  // Main routes
  ROOT: '/',

  // Project routes
  PROJECT: '/project',
  PROJECT_WITH_ID: (id: string) => `/project/${id}`,
  PROJECT_DASHBOARD: (id: string) => `/project/${id}/dashboard`,
  PROJECT_FEEDBACK: (id: string) => `/project/${id}/feedback`,
  PROJECT_ADMIN: (id: string) => `/project/${id}/admin`,

  // User menu routes
  ACCOUNT: '/account',
  BILLING: '/billing',
  NOTIFICATION: '/notification',
  SUPPORT: '/support',
  PRICING: '/pricing'
}

// Helper to get dashboard route for a specific project
export const getProjectDashboardRoute = (projectId: string): string => {
  return ROUTES.PROJECT_DASHBOARD(projectId)
}
