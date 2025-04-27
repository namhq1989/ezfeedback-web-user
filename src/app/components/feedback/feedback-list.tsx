import FeedbackCard from '@/app/components/feedback/feedback-card'
import { IFeedback } from '@/app/models/feedback'
import { useTranslation } from '@/i18n'
import { mockFeedbacks } from '@/mock/mock-feedbacks'
import { useEffect, useState } from 'react'

const FeedbackList = () => {
  const { t } = useTranslation()
  const [filteredFeedbacks, setFilteredFeedbacks] =
    useState<IFeedback[]>(mockFeedbacks)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Calculate current feedbacks to display based on pagination
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredFeedbacks.length)
  const feedbacks = filteredFeedbacks.slice(startIndex, endIndex)

  // Single column list layout for feedback cards
  const listClass = 'flex flex-col gap-4'

  // Listen for filter changes
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      const { searchQuery, selectedCategory, selectedState, selectedRating } =
        event.detail

      const filtered = mockFeedbacks.filter((feedback) => {
        // Filter by search query
        const matchesSearch =
          !searchQuery ||
          feedback.content.toLowerCase().includes(searchQuery.toLowerCase())

        // Filter by category (multi-select)
        const matchesCategory =
          !selectedCategory ||
          selectedCategory.length === 0 ||
          selectedCategory.includes(feedback.categoryId)

        // Filter by state (multi-select)
        const matchesState =
          !selectedState ||
          selectedState.length === 0 ||
          selectedState.includes(feedback.state)

        // Filter by rating
        const matchesRating =
          selectedRating === null || feedback.rating === selectedRating

        return matchesSearch && matchesCategory && matchesState && matchesRating
      })

      setFilteredFeedbacks(filtered)

      // Dispatch pagination data event
      const paginationEvent = new CustomEvent('feedbackPaginationData', {
        detail: { totalCount: filtered.length },
        bubbles: true,
      })
      document.dispatchEvent(paginationEvent)
    }

    document.addEventListener(
      'feedbackFilterChange',
      handleFilterChange as EventListener,
    )
    return () => {
      document.removeEventListener(
        'feedbackFilterChange',
        handleFilterChange as EventListener,
      )
    }
  }, [])

  // Listen for page changes
  useEffect(() => {
    const handlePageChange = (event: CustomEvent) => {
      setCurrentPage(event.detail.page)
    }

    document.addEventListener(
      'feedbackPageChange',
      handlePageChange as EventListener,
    )
    return () => {
      document.removeEventListener(
        'feedbackPageChange',
        handlePageChange as EventListener,
      )
    }
  }, [])

  // Initialize pagination data
  useEffect(() => {
    const paginationEvent = new CustomEvent('feedbackPaginationData', {
      detail: { totalCount: filteredFeedbacks.length },
      bubbles: true,
    })
    document.dispatchEvent(paginationEvent)
  }, [])

  return (
    <div className='w-full'>
      <div className={listClass}>
        {feedbacks.length === 0 ? (
          <div className='text-center text-muted-foreground py-8'>
            {t('feedback:table.noFeedbacks')}
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))
        )}
      </div>
    </div>
  )
}

export default FeedbackList
