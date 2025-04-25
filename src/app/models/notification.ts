export type NotificationType = 'feedback' | 'summary' | 'billing' | 'other'

export const NotificationTypeFeedback: NotificationType = 'feedback'
export const NotificationTypeSummary: NotificationType = 'summary'
export const NotificationTypeBilling: NotificationType = 'billing'
export const NotificationTypeOther: NotificationType = 'other'

export interface INotification {
  id: string
  type: NotificationType
  content: string
  isRead: boolean
  createdAt: string
}
