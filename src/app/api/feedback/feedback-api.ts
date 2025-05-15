import {
  IChangeFeedbackStateRequest,
  IChangeFeedbackStateResponse,
  ICountFeedbacksRequest,
  ICountFeedbacksResponse,
  IGetFeedbackStateHistoryRequest,
  IGetFeedbackStateHistoryResponse,
  IGetFeedbacksRequest,
  IGetFeedbacksResponse,
} from '@/app/api/feedback/feedback-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/feedback'

const API_PATHS = {
  GET_FEEDBACKS: `${API_PREFIX}`,
  CHANGE_FEEDBACK_STATE: (id: string) => `${API_PREFIX}/${id}/state`,
  COUNT_FEEDBACKS: `${API_PREFIX}/count`,
  GET_FEEDBACK_STATE_HISTORY: (id: string) =>
    `${API_PREFIX}/${id}/state-history`,
}

const getFeedbacks = async (params?: IGetFeedbacksRequest) => {
  try {
    if (!params?.projectId) {
      throw new Error('Project ID is required')
    }

    const { get } = useHttpStore.getState()
    return get<IGetFeedbacksResponse>(API_PATHS.GET_FEEDBACKS, params)
  } catch (error) {
    throw error
  }
}

const changeFeedbackState = async (
  id: string,
  data: IChangeFeedbackStateRequest,
) => {
  try {
    const { patch } = useHttpStore.getState()
    return patch<IChangeFeedbackStateResponse>(
      API_PATHS.CHANGE_FEEDBACK_STATE(id),
      data,
    )
  } catch (error) {
    throw error
  }
}

const countFeedbacks = async (params?: ICountFeedbacksRequest) => {
  try {
    if (!params?.projectId) {
      throw new Error('Project ID is required')
    }

    const { get } = useHttpStore.getState()
    return get<ICountFeedbacksResponse>(API_PATHS.COUNT_FEEDBACKS, params)
  } catch (error) {
    throw error
  }
}

const getFeedbackStateHistories = async (
  id: string,
  params?: IGetFeedbackStateHistoryRequest,
) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetFeedbackStateHistoryResponse>(
      API_PATHS.GET_FEEDBACK_STATE_HISTORY(id),
      params,
    )
  } catch (error) {
    throw error
  }
}

export default {
  getFeedbacks,
  changeFeedbackState,
  countFeedbacks,
  getFeedbackStateHistories,
}
