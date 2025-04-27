import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'

interface INotificationPaginationProps {
  currentPage: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
}

const NotificationPagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: INotificationPaginationProps) => {
  const { t } = useTranslation()
  const totalPages = Math.ceil(totalCount / pageSize)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  if (totalCount <= pageSize) {
    return null
  }

  return (
    <div className='flex justify-between items-center'>
      <div className='ml-4 text-xs text-muted-foreground'>
        {t('notification.list.showing', {
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
          {t('notification.actions.prev')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='rounded-xl text-xs'
        >
          {t('notification.actions.next')}
        </Button>
      </div>
    </div>
  )
}

export default NotificationPagination
