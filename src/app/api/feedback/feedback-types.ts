import { CampaignType, FeedbackState, IFeedback } from '@/app/models/feedback'

//
// GET FEEDBACKS
//

export interface IGetFeedbacksRequest {
  projectId?: string
  categoryId?: string
  campaignType?: CampaignType
  keyword?: string
  state?: FeedbackState
  rating?: number
  page?: number
}

export interface IGetFeedbacksResponse {
  feedbacks: IFeedback[]
  limit: number
}

//
// CHANGE FEEDBACK STATE
//

export interface IChangeFeedbackStateRequest {
  state: FeedbackState
}

export interface IChangeFeedbackStateResponse {}

//
// COUNT FEEDBACKS
//

export interface ICountFeedbacksRequest {
  projectId?: string
  categoryId?: string
  campaignType?: CampaignType
  keyword?: string
  state?: FeedbackState
  rating?: number
}

export interface ICountFeedbacksResponse {
  total: number
}
