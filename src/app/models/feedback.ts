import { IUser } from '@/app/models/user'

export interface IFeedback {
  id: string
  campaign: {
    id: string
    name: string
  }
  category: {
    id: string
    name: string
  }
  appUserId: string
  email?: string
  content: string
  rating: number
  isAnonymous: boolean
  state: FeedbackState
  campaignType: string
  ip?: string
  countryCode?: string
  stats: {
    totalReplies: number
  }
  isRead: boolean
  createdAt: string
  updatedAt?: string
}

export enum FeedbackState {
  New = 'new',
  InReview = 'in_review',
  Planned = 'planned',
  InProgress = 'in_progress',
  Completed = 'completed',
  Declined = 'declined',
}

export const FeedbackStateColors: Record<FeedbackState, string> = {
  [FeedbackState.New]: 'blue-500',
  [FeedbackState.InReview]: 'yellow-500',
  [FeedbackState.Planned]: 'purple-500',
  [FeedbackState.InProgress]: 'orange-500',
  [FeedbackState.Completed]: 'green-500',
  [FeedbackState.Declined]: 'red-500',
}

export type FeedbackStateType = keyof typeof FeedbackState

export enum CampaignType {
  Feedback = 'feedback',
  CSAT = 'csat',
  NPS = 'nps',
}

export type CampaignTypeType = keyof typeof CampaignType

export interface IFeedbackStateHistory {
  id: string
  state: FeedbackState
  createdAt: string
  user: IUser
}
