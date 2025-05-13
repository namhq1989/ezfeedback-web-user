import {
  IChangeFeedbackStateRequest,
  IChangeFeedbackStateResponse,
  ICountFeedbacksRequest,
  ICountFeedbacksResponse,
  IGetFeedbacksRequest,
  IGetFeedbacksResponse,
} from '@/app/api/feedback/feedback-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/feedback'

const API_PATHS = {
  GET_FEEDBACKS: `${API_PREFIX}`,
  CHANGE_FEEDBACK_STATE: (id: string) => `${API_PREFIX}/${id}/state`,
  COUNT_FEEDBACKS: `${API_PREFIX}/count`,
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
  projectId: string,
) => {
  try {
    if (!projectId) {
      throw new Error('Project ID is required')
    }
    
    const { patch } = useHttpStore.getState()
    return patch<IChangeFeedbackStateResponse>(
      API_PATHS.CHANGE_FEEDBACK_STATE(id),
      { ...data, projectId },
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

export default {
  getFeedbacks,
  changeFeedbackState,
  countFeedbacks,
}
