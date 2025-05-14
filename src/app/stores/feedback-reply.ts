import feedbackApi from '@/app/api/feedback'
import {
  ICreateFeedbackReplyRequest,
  IGetFeedbackRepliesRequest,
  IUpdateFeedbackReplyRequest,
} from '@/app/api/feedback/feedback-reply-types'
import { IFeedbackReply } from '@/app/models/feedback-reply'
import { create } from 'zustand/react'
import useAuthStore from './auth'
import useFeedbackStore from './feedback'

export interface IFeedbackReplyStore {
  // Feedback reply data
  replies: IFeedbackReply[]
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null
  limit: number

  // Feedback reply methods
  getReplies: (
    feedbackId: string,
    params?: IGetFeedbackRepliesRequest,
  ) => Promise<IFeedbackReply[]>
  createReply: (
    feedbackId: string,
    data: ICreateFeedbackReplyRequest,
  ) => Promise<void>
  updateReply: (
    feedbackId: string,
    replyId: string,
    data: IUpdateFeedbackReplyRequest,
  ) => Promise<boolean>
  deleteReply: (feedbackId: string, replyId: string) => Promise<boolean>
  setReplies: (replies: IFeedbackReply[]) => void
  clearReplies: () => void
}

const useFeedbackReplyStore = create<IFeedbackReplyStore>((set, get) => ({
  // Feedback reply data
  replies: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  limit: 20,

  // Feedback reply methods
  getReplies: async (
    feedbackId: string,
    params?: IGetFeedbackRepliesRequest,
  ) => {
    try {
      set({ isLoading: true, error: null })

      const response = await feedbackApi.getFeedbackReplies(feedbackId, params)
      const replies = response.replies || []
      const limit = response.limit || 20

      set({
        replies,
        limit,
        isLoading: false,
      })

      return replies
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      })
      return []
    }
  },

  createReply: async (
    feedbackId: string,
    data: ICreateFeedbackReplyRequest,
  ) => {
    const { me } = useAuthStore.getState()
    if (!me) return

    try {
      set({ isCreating: true, error: null })

      // Call the API to create the reply
      const { id } = await feedbackApi.createFeedbackReply(feedbackId, data)

      // Create a new reply object locally
      const newReply: IFeedbackReply = {
        id,
        content: data.content,
        createdAt: new Date().toISOString(),
        isEdited: false,
        user: {
          id: me?.id,
          email: me?.email,
          name: me?.name,
        },
      }

      const currentReplies = get().replies
      const updatedReplies = [newReply, ...currentReplies]
      set({ replies: updatedReplies, isCreating: false })

      // Also update the feedback store to increment reply count
      const { incrementReplyCount } = useFeedbackStore.getState()
      incrementReplyCount(feedbackId)
    } catch (error) {
      set({
        error: (error as Error).message,
        isCreating: false,
      })
      throw error
    }
  },

  updateReply: async (
    feedbackId: string,
    replyId: string,
    data: IUpdateFeedbackReplyRequest,
  ) => {
    try {
      set({ isUpdating: true, error: null })

      await feedbackApi.updateFeedbackReply(feedbackId, replyId, data)

      // Update the reply in the store
      const { replies } = get()
      const updatedReplies = replies.map((reply) =>
        reply.id === replyId
          ? { ...reply, content: data.content, isEdited: true }
          : reply,
      )

      set({
        replies: updatedReplies,
        isUpdating: false,
      })

      return true
    } catch (error) {
      set({
        error: (error as Error).message,
        isUpdating: false,
      })
      return false
    }
  },

  deleteReply: async (feedbackId: string, replyId: string) => {
    try {
      set({ isDeleting: true, error: null })

      await feedbackApi.deleteFeedbackReply(feedbackId, replyId)

      // Remove the reply from the store
      const { replies } = get()
      const updatedReplies = replies.filter((reply) => reply.id !== replyId)

      set({
        replies: updatedReplies,
        isDeleting: false,
      })

      return true
    } catch (error) {
      set({
        error: (error as Error).message,
        isDeleting: false,
      })
      return false
    }
  },

  setReplies: (replies: IFeedbackReply[]) => {
    set({ replies })
  },

  clearReplies: () => {
    set({ replies: [] })
  },
}))

export default useFeedbackReplyStore
