import {
  CampaignType,
  FeedbackState,
  IFeedback,
  IFeedbackStateHistory,
} from '@/app/models/feedback'

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
  isRead?: boolean
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

//
// GET FEEDBACK STATE HISTORY
//

export interface IGetFeedbackStateHistoryRequest {
  page?: number
}

export interface IGetFeedbackStateHistoryResponse {
  histories: IFeedbackStateHistory[]
  limit: number
}
