import {
  FeedbackFilters,
  FeedbackList,
  FeedbackPagination,
  IFeedbackFilters,
} from '@/app/components/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import useProjectStore from '@/app/stores/project'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'

const FeedbackPage = () => {
  const { t } = useTranslation()
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const { filters, feedbacks } = useFeedbackStore()
  const { selectedProject } = useProjectStore()

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

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Mobile filter toggle button - only visible on small screens */}
        <div className='md:hidden mb-4'>
          <Button
            onClick={toggleFilter}
            variant='outline'
            className='w-full rounded-xl flex items-center justify-between'
          >
            <span className='flex items-center gap-2'>
              <Filter size={16} />
              {t('feedback:filters.title')}
            </span>
            {isFilterVisible ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </Button>
        </div>

        {/* Responsive layout */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Filter section - collapsible on mobile, always visible on desktop */}
          <div
            className={`${isFilterVisible ? 'block' : 'hidden'} md:block md:w-64`}
          >
            <FeedbackFilters onFilterChange={handleFilterChange} />
          </div>

          {/* Main content: Feedback list with pagination */}
          <div className='flex-1 space-y-4'>
            {/* Feedback list */}
            <FeedbackList />

            {/* Pagination - only show when there are feedbacks */}
            {feedbacks.length > 0 && <FeedbackPagination />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
