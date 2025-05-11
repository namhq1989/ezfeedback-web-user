import feedbackApi from '@/app/api/feedback'
import { IGetFeedbacksRequest } from '@/app/api/feedback/feedback-types'
import { FeedbackState, IFeedback } from '@/app/models/feedback'
import useProjectStore from '@/app/stores/project'
import { create } from 'zustand/react'

export interface IFeedbackStore {
  feedbacks: IFeedback[]
  isLoadingFeedbacks: boolean
  isChangingFeedbackState: boolean
  isCountingFeedbacks: boolean
  error: string | null
  limit: number
  totalCount: number
  filters: IGetFeedbacksRequest
  getFeedbacks: (params?: IGetFeedbacksRequest) => Promise<IFeedback[]>
  countFeedbacks: (params?: IGetFeedbacksRequest) => Promise<number>
  setFeedbacks: (feedbacks: IFeedback[]) => void
  setFilters: (filters: IGetFeedbacksRequest) => void
  changeFeedbackState: (id: string, state: FeedbackState) => Promise<boolean>
}

const useFeedbackStore = create<IFeedbackStore>((set, get) => ({
  feedbacks: [],
  isLoadingFeedbacks: false,
  isChangingFeedbackState: false,
  isCountingFeedbacks: false,
  error: null,
  limit: 20,
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

      // Get project ID from project store
      const { selectedProject } = useProjectStore.getState()
      if (!selectedProject?.id) {
        throw new Error('No project selected')
      }

      await feedbackApi.changeFeedbackState(id, { state }, selectedProject.id)

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
}))

export default useFeedbackStore
