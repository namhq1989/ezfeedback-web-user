import {
  FeedbackCompactList,
  FeedbackDetail,
  FeedbackFilters,
  FeedbackPagination,
  IFeedbackFilters,
} from '@/app/components/feedback'
import { IFeedbackStateHistory } from '@/app/models/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import useProjectStore from '@/app/stores/project'
import { useEffect, useState } from 'react'

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
    <div className='container py-6 px-2 md:py-8 md:px-6'>
      {/* State filters */}
      <div className='mb-6'>
        <FeedbackFilters
          onFilterChange={handleFilterChange}
          stateFilterOnly={true}
          horizontal={true}
        />
      </div>

      <div className='grid grid-cols-12 gap-6 h-[calc(100vh-200px)]'>
        {/* Left column: Feedback List */}
        <div className='col-span-12 md:col-span-4 flex flex-col px-0 md:px-4'>
          <div className='overflow-hidden flex flex-col gap-2'>
            {/* Feedback list */}
            <FeedbackCompactList
              feedbacks={feedbacks}
              isLoading={isLoadingFeedbacks}
              selectedFeedbackId={selectedFeedbackId}
              onFeedbackSelect={handleFeedbackSelect}
            />

            {/* Pagination */}
            {!isLoadingFeedbacks && feedbacks.length > 0 && (
              <div className='mt-4 flex-shrink-0'>
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
        <div className='h-4' />
      </div>
    </div>
  )
}

export default FeedbackPage
