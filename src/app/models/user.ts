export interface IMe {
  id: string
  email: string
  name: string
}

export interface IUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
  plan: 'Free' | 'Growth' | 'Pro'
  usage: {
    feedbackCount: number
    projectCount: number
  }
  notificationPreferences: {
    newFeedback: boolean
    reply: boolean
    collaboration: boolean
    weeklySummary: boolean
  }
  defaultProjectSettings: {
    publicFeedback: boolean
    anonymousFeedback: boolean
    votingEnabled: boolean
  }
  sessions: Array<{
    id: string
    device: string
    lastActive: string
    current: boolean
  }>
  lastLogin: string
}

export interface IUser {
  id: string
  name: string
  email: string
}
