import { IFeedbackReply } from '@/app/models/feedback-reply'

//
// CREATE FEEDBACK REPLY
//

export interface ICreateFeedbackReplyRequest {
  content: string
}

export interface ICreateFeedbackReplyResponse {
  id: string
}

//
// GET FEEDBACK REPLIES
//

export interface IGetFeedbackRepliesRequest {
  page?: number
}

export interface IGetFeedbackRepliesResponse {
  limit: number
  replies: IFeedbackReply[]
}

//
// UPDATE FEEDBACK REPLY
//

export interface IUpdateFeedbackReplyRequest {
  content: string
}

export interface IUpdateFeedbackReplyResponse {}

//
// DELETE FEEDBACK REPLY
//

export interface IDeleteFeedbackReplyRequest {}

export interface IDeleteFeedbackReplyResponse {}
