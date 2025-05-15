import {
  FeedbackCompactList,
  FeedbackFilters,
  FeedbackPagination,
  IFeedbackFilters,
} from '@/app/components/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import useProjectStore from '@/app/stores/project'
import { useTranslation } from '@/i18n'
import { useEffect, useState } from 'react'

const FeedbackPage = () => {
  const { t } = useTranslation()
  const { filters, feedbacks, isLoadingFeedbacks } = useFeedbackStore()
  const { selectedProject } = useProjectStore()
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null,
  )

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
  }

  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      {/* State filters - Mobile style matching user-menu-layout */}
      <FeedbackFilters
        onFilterChange={handleFilterChange}
        stateFilterOnly={true}
        horizontal={true}
      />

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Left column: Feedback List */}
        <div className='w-full md:w-90 flex flex-col gap-4'>
          {/* Feedback list */}
          <FeedbackCompactList
            feedbacks={feedbacks}
            isLoading={isLoadingFeedbacks}
            selectedFeedbackId={selectedFeedbackId}
            onFeedbackSelect={handleFeedbackSelect}
          />

          {/* Pagination */}
          {!isLoadingFeedbacks && feedbacks.length > 0 && (
            <div className='mt-4'>
              <FeedbackPagination />
            </div>
          )}
        </div>

        {/* Right column: Feedback Content */}
        <div className='flex-1 border rounded-xl p-6 hidden md:flex items-center justify-center'>
          <div className='text-muted-foreground'>
            {t('feedback:content.select')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
