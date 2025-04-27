import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { useEffect, useState } from 'react'

const FeedbackPagination = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 10
  const totalPages = Math.ceil(totalCount / pageSize)

  // Listen for pagination data changes
  useEffect(() => {
    const handlePaginationData = (event: CustomEvent) => {
      const { totalCount } = event.detail
      setTotalCount(totalCount)
    }

    document.addEventListener(
      'feedbackPaginationData',
      handlePaginationData as EventListener,
    )
    return () => {
      document.removeEventListener(
        'feedbackPaginationData',
        handlePaginationData as EventListener,
      )
    }
  }, [])

  // Dispatch page change event
  const dispatchPageChange = (page: number) => {
    const pageChangeEvent = new CustomEvent('feedbackPageChange', {
      detail: { page },
      bubbles: true,
    })
    document.dispatchEvent(pageChangeEvent)
  }

  // Update local state and dispatch event
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    dispatchPageChange(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Always show pagination controls
  // if (totalCount <= pageSize) {
  //   return null
  // }

  return (
    <div className='flex justify-between items-center'>
      <div className='ml-4 text-xs text-muted-foreground'>
        {t('feedback:pagination.showing', {
          from: (currentPage - 1) * pageSize + 1,
          to: Math.min(currentPage * pageSize, totalCount),
          total: totalCount,
        })}
      </div>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.prev')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='rounded-xl text-xs'
        >
          {t('feedback:pagination.next')}
        </Button>
      </div>
    </div>
  )
}

export default FeedbackPagination
