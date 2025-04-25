import type { IUser } from '@/app/models/user'

export const mockUser: IUser = {
  id: 'user123',
  name: 'Jane Doe',
  email: 'jane@example.com',
  plan: 'Growth',
  usage: { feedbackCount: 27, projectCount: 3 },
  notificationPreferences: {
    newFeedback: true,
    reply: false,
    collaboration: true,
    weeklySummary: false,
  },
  defaultProjectSettings: {
    publicFeedback: true,
    anonymousFeedback: false,
    votingEnabled: true,
  },
  sessions: [
    { id: 'sess1', device: 'MacBook Pro', lastActive: new Date().toISOString(), current: true },
    { id: 'sess2', device: 'iPhone 14', lastActive: new Date(Date.now() - 86400000).toISOString(), current: false },
  ],
  lastLogin: new Date(Date.now() - 3600000).toISOString(),
}
