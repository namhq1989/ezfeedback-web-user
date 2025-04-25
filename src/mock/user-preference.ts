import type { IUser } from '@/app/models/user'

export const mockUser: IUser = {
  id: 'u123',
  name: 'Jane Doe',
  email: 'jane@example.com',
  plan: 'Growth',
  usage: { feedbackCount: 42, projectCount: 3 },
  notificationPreferences: {
    newFeedback: true,
    reply: true,
    collaboration: false,
    weeklySummary: true,
  },
  defaultProjectSettings: {
    publicFeedback: true,
    anonymousFeedback: false,
    votingEnabled: true,
  },
  sessions: [
    {
      id: 'sess1',
      device: 'MacBook Pro',
      lastActive: '2025-04-24T15:30:00+07:00',
      current: true,
    },
    {
      id: 'sess2',
      device: 'iPhone 14',
      lastActive: '2025-04-23T20:10:00+07:00',
      current: false,
    },
  ],
  lastLogin: '2025-04-24T15:30:00+07:00',
}
