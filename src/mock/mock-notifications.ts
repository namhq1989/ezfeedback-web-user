import { INotification, NotificationType } from '@/app/models/notification'

export const mockNotifications: INotification[] = [
  {
    id: 'notif-001',
    type: 'feedback',
    content: 'You received a new feedback on your project "Website Redesign"',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
  {
    id: 'notif-002',
    type: 'summary',
    content: 'Your daily feedback summary for April 25, 2025 is now available',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: 'notif-003',
    type: 'billing',
    content:
      'Your subscription has been successfully renewed for the next month',
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
  },
  {
    id: 'notif-004',
    type: 'feedback',
    content: 'The status of feedback #1234 has been changed to "In Progress"',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 'notif-005',
    type: 'other',
    content:
      'The system will undergo maintenance on April 30, 2025 from 2-4 AM UTC',
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 'notif-006',
    type: 'summary',
    content:
      'Your weekly feedback summary for April 18-24, 2025 is now available',
    isRead: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 'notif-007',
    type: 'billing',
    content: 'Your invoice for April 2025 is now available for download',
    isRead: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    id: 'notif-008',
    type: 'feedback',
    content: 'You received a new feedback on your project "Website Redesign"',
    isRead: false,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    id: 'notif-009',
    type: 'summary',
    content:
      'Your weekly feedback summary for April 18-24, 2025 is now available',
    isRead: true,
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
  },
  {
    id: 'notif-010',
    type: 'billing',
    content: 'Your invoice for April 2025 is now available for download',
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
]

// Helper function to get notification title based on type
export const getNotificationTitle = (type: NotificationType): string => {
  switch (type) {
    case 'feedback':
      return 'New feedback'
    case 'summary':
      return 'Summary report'
    case 'billing':
      return 'Billing update'
    case 'other':
    default:
      return 'Notification'
  }
}

// Helper function to format date for display
export const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`
}
