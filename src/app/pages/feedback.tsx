import {
  FeedbackCompactList,
  FeedbackDetail,
  FeedbackPagination,
} from '@/app/components/feedback'
import { StateCombobox } from '@/app/components/feedback/feedback-filters'
import {
  CampaignType,
  FeedbackState,
  IFeedbackStateHistory,
} from '@/app/models/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import useProjectStore from '@/app/stores/project'
import { useEffect, useState } from 'react'

// Define the interface locally since it's no longer imported
interface IFeedbackFilters {
  projectId?: string
  categoryId?: string
  campaignType?: CampaignType
  keyword?: string
  state?: FeedbackState
  rating?: number
  page?: number
}

const FeedbackPage = () => {
  const { filters, feedbacks, isLoadingFeedbacks } = useFeedbackStore()
  const { selectedProject } = useProjectStore()
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  )
  const [isLoadingFeedbackDetail, setIsLoadingFeedbackDetail] =
    useState<boolean>(false)
  const [selectedFeedbackHistory, setSelectedFeedbackHistory] = useState<
    IFeedbackStateHistory[]
  >([])

  // Get store actions
  const { getFeedbacks, countFeedbacks, setFilters } = useFeedbackStore()

  // Load data when project changes
  useEffect(() => {
    if (selectedProject?.id) {
      // Update project ID in filters
      setFilters({ ...filters, projectId: selectedProject.id })

      // Load initial data
      const loadData = async () => {
        await getFeedbacks()
        await countFeedbacks()
      }

      loadData()
    }
  }, [selectedProject?.id])

  const handleFilterChange = (newFilters: IFeedbackFilters) => {
    // Update filters and fetch data
    setFilters(newFilters)

    // Manually fetch data with updated filters
    const updateData = async () => {
      await getFeedbacks()
      await countFeedbacks()
    }

    updateData()
  }

  const handleFeedbackSelect = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId)
    setIsLoadingFeedbackDetail(true)

    // In a real implementation, you would fetch the feedback details and history here
    // For now, we'll just simulate loading with a timeout
    setTimeout(() => {
      setIsLoadingFeedbackDetail(false)
      setSelectedFeedbackHistory([])
    }, 500)
  }

  return (
    <div className='flex py-12 min-h-screen'>
      <div className='container max-w-8xl mx-auto'>
        {/* State filters */}
        <div className='mb-6'>
          <div className='flex flex-row items-center gap-4 pb-2'>
            <StateCombobox
              state={filters.state}
              onStateChange={(state?: FeedbackState) => {
                const newFilters = { ...filters, state, page: 0 }
                setFilters(newFilters)
                handleFilterChange(newFilters)
              }}
              className='w-[180px]'
            />
          </div>
        </div>

        <div className='grid grid-cols-12 gap-6 h-[calc(100vh-240px)]'>
          {/* Left column: Feedback List */}
          <div className='col-span-12 md:col-span-4 flex flex-col'>
            <div className='overflow-hidden flex flex-col h-full'>
              {/* Feedback list - takes most of the space */}
              <div className='flex-1 overflow-y-auto'>
                <FeedbackCompactList
                  feedbacks={feedbacks}
                  isLoading={isLoadingFeedbacks}
                  selectedFeedbackId={selectedFeedbackId}
                  onFeedbackSelect={handleFeedbackSelect}
                />
              </div>

              {/* Pagination - fixed at bottom */}
              {!isLoadingFeedbacks && feedbacks.length > 0 && (
                <div className='mt-4 py-2 flex-shrink-0'>
                  <FeedbackPagination />
                </div>
              )}
            </div>
          </div>

          {/* Right column: Feedback Detail */}
          <div className='col-span-12 md:col-span-8 hidden md:block'>
            <FeedbackDetail
              feedback={
                selectedFeedbackId
                  ? feedbacks.find((f) => f.id === selectedFeedbackId) || null
                  : null
              }
              stateHistory={selectedFeedbackHistory}
              isLoading={isLoadingFeedbackDetail}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
