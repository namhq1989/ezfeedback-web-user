import NotificationList from '@/app/components/notification/notification-list'
import NotificationPagination from '@/app/components/notification/notification-pagination'
import { mockNotifications } from '@/mock/mock-notifications'
import { useState } from 'react'

const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalNotifications = 23
  const pageSize = 10

  // Calculate the current page of notifications
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentNotifications = mockNotifications.slice(startIndex, endIndex)

  return (
    <div className='space-y-4'>
      <NotificationList notifications={currentNotifications} />
      <NotificationPagination
        currentPage={currentPage}
        totalCount={totalNotifications}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default NotificationPage
