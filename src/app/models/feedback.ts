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

export type FeedbackStateType = keyof typeof FeedbackState

export enum CampaignType {
  Feedback = 'feedback',
  Survey = 'survey',
  NPS = 'nps',
}

export type CampaignTypeType = keyof typeof CampaignType
