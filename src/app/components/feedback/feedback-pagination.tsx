import useFeedbackStore from '@/app/stores/feedback'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { formatNumber } from '@/lib/number'

interface IFeedbackPaginationProps {}

const FeedbackPagination = ({}: IFeedbackPaginationProps) => {
  const { t } = useTranslation()
  const { totalCount, limit, filters, setFilters } = useFeedbackStore()
  const totalPages = Math.ceil(totalCount / limit)

  // Always show pagination as requested

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

  // Even if there's only one page, maintain the same layout
  // but disable the pagination buttons
  const isOnlyOnePage = totalPages <= 1

  return (
    <div className='flex justify-between items-center'>
      <div className='ml-4 text-xs text-muted-foreground'>
        {t('feedback:pagination.showing', {
          from: formatNumber((filters.page || 0) * limit + 1, {
            compact: false,
          }),
          to: formatNumber(
            Math.min(((filters.page || 0) + 1) * limit, totalCount),
            { compact: false },
          ),
          total: formatNumber(totalCount),
        })}
      </div>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={handlePrevPage}
          disabled={filters.page === 0 || isOnlyOnePage}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.prev')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={handleNextPage}
          disabled={filters.page === totalPages - 1 || isOnlyOnePage}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.next')}
        </Button>
      </div>
    </div>
  )
}

export default FeedbackPagination
