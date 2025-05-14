import {
  ICreateFeedbackReplyRequest,
  ICreateFeedbackReplyResponse,
  IDeleteFeedbackReplyResponse,
  IGetFeedbackRepliesRequest,
  IGetFeedbackRepliesResponse,
  IUpdateFeedbackReplyRequest,
  IUpdateFeedbackReplyResponse,
} from '@/app/api/feedback/feedback-reply-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/feedback'

const API_PATHS = {
  CREATE_FEEDBACK_REPLY: (feedbackId: string) =>
    `${API_PREFIX}/${feedbackId}/reply`,
  GET_FEEDBACK_REPLIES: (feedbackId: string) =>
    `${API_PREFIX}/${feedbackId}/reply`,
  UPDATE_FEEDBACK_REPLY: (feedbackId: string, replyId: string) =>
    `${API_PREFIX}/${feedbackId}/reply/${replyId}`,
  DELETE_FEEDBACK_REPLY: (feedbackId: string, replyId: string) =>
    `${API_PREFIX}/${feedbackId}/reply/${replyId}`,
}

const createFeedbackReply = async (
  feedbackId: string,
  data: ICreateFeedbackReplyRequest,
) => {
  try {
    if (!data.content || data.content.trim() === '') {
      throw new Error('Content is required')
    }

    if (data.content.length > 2000) {
      throw new Error('Content must be less than 2000 characters')
    }

    const { post } = useHttpStore.getState()
    return post<ICreateFeedbackReplyResponse>(
      API_PATHS.CREATE_FEEDBACK_REPLY(feedbackId),
      data,
    )
  } catch (error) {
    throw error
  }
}

const getFeedbackReplies = async (
  feedbackId: string,
  params?: IGetFeedbackRepliesRequest,
) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetFeedbackRepliesResponse>(
      API_PATHS.GET_FEEDBACK_REPLIES(feedbackId),
      params,
    )
  } catch (error) {
    throw error
  }
}

const updateFeedbackReply = async (
  feedbackId: string,
  replyId: string,
  data: IUpdateFeedbackReplyRequest,
) => {
  try {
    if (!data.content || data.content.trim() === '') {
      throw new Error('Content is required')
    }

    if (data.content.length > 2000) {
      throw new Error('Content must be less than 2000 characters')
    }

    const { put } = useHttpStore.getState()
    return put<IUpdateFeedbackReplyResponse>(
      API_PATHS.UPDATE_FEEDBACK_REPLY(feedbackId, replyId),
      data,
    )
  } catch (error) {
    throw error
  }
}

const deleteFeedbackReply = async (feedbackId: string, replyId: string) => {
  try {
    const { delete: deleteRequest } = useHttpStore.getState()
    return deleteRequest<IDeleteFeedbackReplyResponse>(
      API_PATHS.DELETE_FEEDBACK_REPLY(feedbackId, replyId),
      {},
    )
  } catch (error) {
    throw error
  }
}

export default {
  createFeedbackReply,
  getFeedbackReplies,
  updateFeedbackReply,
  deleteFeedbackReply,
}
