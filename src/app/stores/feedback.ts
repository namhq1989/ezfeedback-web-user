import feedbackApi from '@/app/api/feedback'
import {
  IGetFeedbackStateHistoryRequest,
  IGetFeedbacksRequest,
} from '@/app/api/feedback/feedback-types'
import {
  FeedbackState,
  IFeedback,
  IFeedbackStateHistory,
} from '@/app/models/feedback'
import useProjectStore from '@/app/stores/project'
import { create } from 'zustand/react'

export interface IFeedbackStore {
  feedbacks: IFeedback[]
  stateHistories: IFeedbackStateHistory[]
  isLoadingFeedbacks: boolean
  isLoadingStateHistories: boolean
  isChangingFeedbackState: boolean
  isCountingFeedbacks: boolean
  error: string | null
  limit: number
  stateHistoriesLimit: number
  totalCount: number
  filters: IGetFeedbacksRequest
  getFeedbacks: (params?: IGetFeedbacksRequest) => Promise<IFeedback[]>
  countFeedbacks: (params?: IGetFeedbacksRequest) => Promise<number>
  getFeedbackStateHistories: (
    feedbackId: string,
    params?: IGetFeedbackStateHistoryRequest,
  ) => Promise<IFeedbackStateHistory[]>
  setFeedbacks: (feedbacks: IFeedback[]) => void
  setStateHistories: (histories: IFeedbackStateHistory[]) => void
  clearStateHistories: () => void
  setFilters: (filters: IGetFeedbacksRequest) => void
  changeFeedbackState: (id: string, state: FeedbackState) => Promise<boolean>
  incrementReplyCount: (feedbackId: string) => void
}

const useFeedbackStore = create<IFeedbackStore>((set, get) => ({
  feedbacks: [],
  stateHistories: [],
  isLoadingFeedbacks: false,
  isLoadingStateHistories: false,
  isChangingFeedbackState: false,
  isCountingFeedbacks: false,
  error: null,
  limit: 20,
  stateHistoriesLimit: 50,
  totalCount: 0,
  filters: {
    page: 0,
  },

  getFeedbacks: async (params?: IGetFeedbacksRequest) => {
    try {
      set({ isLoadingFeedbacks: true, error: null })

      // Get project ID from project store
      const { selectedProject } = useProjectStore.getState()
      if (!selectedProject?.id) {
        throw new Error('No project selected')
      }

      // Merge current filters with new params and ensure projectId is included
      const currentFilters = get().filters

      // Create a clean params object without undefined values
      const cleanParams: IGetFeedbacksRequest = {}

      // Only include defined values from current filters
      if (currentFilters.page !== undefined)
        cleanParams.page = currentFilters.page
      if (currentFilters.categoryId)
        cleanParams.categoryId = currentFilters.categoryId
      if (currentFilters.campaignType)
        cleanParams.campaignType = currentFilters.campaignType
      if (currentFilters.keyword) cleanParams.keyword = currentFilters.keyword
      if (currentFilters.state) cleanParams.state = currentFilters.state
      if (currentFilters.rating) cleanParams.rating = currentFilters.rating

      // Merge with new params and ensure projectId is included
      const mergedParams = {
        ...cleanParams,
        ...params,
        projectId: selectedProject.id,
      }

      // Save the filters
      set({ filters: mergedParams })

      const response = await feedbackApi.getFeedbacks(mergedParams)
      const feedbacks = response.feedbacks || []
      const limit = response.limit || 20

      set({
        feedbacks,
        limit,
        isLoadingFeedbacks: false,
      })

      return feedbacks
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoadingFeedbacks: false,
      })
      return []
    }
  },

  countFeedbacks: async (params?: IGetFeedbacksRequest) => {
    try {
      set({ isCountingFeedbacks: true, error: null })

      // Get project ID from project store
      const { selectedProject } = useProjectStore.getState()
      if (!selectedProject?.id) {
        throw new Error('No project selected')
      }

      // Use current filters if no params provided
      const currentFilters = get().filters

      // Create a clean params object without undefined values
      const cleanParams: IGetFeedbacksRequest = {}

      // Only include defined values from current filters
      if (currentFilters.page !== undefined)
        cleanParams.page = currentFilters.page
      if (currentFilters.categoryId)
        cleanParams.categoryId = currentFilters.categoryId
      if (currentFilters.campaignType)
        cleanParams.campaignType = currentFilters.campaignType
      if (currentFilters.keyword) cleanParams.keyword = currentFilters.keyword
      if (currentFilters.state) cleanParams.state = currentFilters.state
      if (currentFilters.rating) cleanParams.rating = currentFilters.rating

      // Merge with new params and ensure projectId is included
      const mergedParams = {
        ...cleanParams,
        ...params,
        projectId: selectedProject.id,
      }

      // Remove page parameter as it's not needed for count
      const { page, ...countParams } = mergedParams

      const response = await feedbackApi.countFeedbacks(countParams)
      const total = response.total || 0

      // Mock data has been removed

      set({
        totalCount: total,
        isCountingFeedbacks: false,
      })

      return total
    } catch (error) {
      set({
        error: (error as Error).message,
        isCountingFeedbacks: false,
      })
      return 0
    }
  },

  setFeedbacks: (feedbacks: IFeedback[]) => {
    set({ feedbacks })
  },

  setFilters: (filters: IGetFeedbacksRequest) => {
    set({ filters })
  },

  changeFeedbackState: async (id: string, state: FeedbackState) => {
    try {
      set({ isChangingFeedbackState: true, error: null })

      await feedbackApi.changeFeedbackState(id, { state })

      // Update the feedback in the store
      const { feedbacks } = get()
      const updatedFeedbacks = feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, state } : feedback,
      )

      set({
        feedbacks: updatedFeedbacks,
        isChangingFeedbackState: false,
      })

      return true
    } catch (error) {
      set({
        error: (error as Error).message,
        isChangingFeedbackState: false,
      })
      return false
    }
  },

  getFeedbackStateHistories: async (
    feedbackId: string,
    params?: IGetFeedbackStateHistoryRequest,
  ) => {
    try {
      set({ isLoadingStateHistories: true, error: null })

      const response = await feedbackApi.getFeedbackStateHistories(
        feedbackId,
        params,
      )
      const histories = response.histories || []
      const limit = response.limit || 50

      set({
        stateHistories: histories,
        stateHistoriesLimit: limit,
        isLoadingStateHistories: false,
      })

      return histories
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoadingStateHistories: false,
      })
      return []
    }
  },

  setStateHistories: (histories: IFeedbackStateHistory[]) => {
    set({ stateHistories: histories })
  },

  clearStateHistories: () => {
    set({ stateHistories: [] })
  },

  incrementReplyCount: (feedbackId: string) => {
    // Get current feedbacks
    const { feedbacks } = get()

    // Create a new array with the updated feedback
    const updatedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.id === feedbackId) {
        // Create a new feedback object with incremented reply count
        return {
          ...feedback,
          stats: {
            ...feedback.stats,
            totalReplies: (feedback.stats?.totalReplies || 0) + 1,
          },
        }
      }
      return feedback
    })

    // Update the store
    set({ feedbacks: updatedFeedbacks })
  },
}))

export default useFeedbackStore
