import useFeedbackStore from '@/app/stores/feedback'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'

const FeedbackPagination = () => {
  const { t } = useTranslation()
  const { totalCount, limit, filters, setFilters } = useFeedbackStore()
  const totalPages = Math.ceil(totalCount / limit)

  // Handle page change
  const handlePageChange = (page: number) => {
    // Create a new filters object with the updated page
    const newFilters = { ...filters, page }
    // Update the filters in the store
    setFilters(newFilters)
    // Manually fetch data with the new page
    const { getFeedbacks } = useFeedbackStore.getState()
    getFeedbacks(newFilters)
  }

  const handlePrevPage = () => {
    // Page is now 0-indexed
    if (filters.page !== undefined && filters.page > 0) {
      handlePageChange(filters.page - 1)
    }
  }

  const handleNextPage = () => {
    if (filters.page !== undefined && filters.page < totalPages - 1) {
      handlePageChange(filters.page + 1)
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='ml-4 text-xs text-muted-foreground'>
        {t('feedback:pagination.showing', {
          from: (filters.page || 0) * limit + 1,
          to: Math.min(((filters.page || 0) + 1) * limit, totalCount),
          total: totalCount,
        })}
      </div>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={handlePrevPage}
          disabled={filters.page === 0}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.prev')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={handleNextPage}
          disabled={filters.page === totalPages - 1}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.next')}
        </Button>
      </div>
    </div>
  )
}

export default FeedbackPagination
