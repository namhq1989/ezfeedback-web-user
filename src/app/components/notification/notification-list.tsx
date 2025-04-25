import NotificationItem from '@/app/components/notification/notification-item'
import { INotification } from '@/app/models/notification'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/i18n'

export interface INotificationListProps {
  notifications: INotification[]
}

const NotificationList = ({ notifications }: INotificationListProps) => {
  const { t } = useTranslation()

  return (
    <div className='w-full border rounded-xl'>
      <div className='py-4'>
        <div className='flex flex-col'>
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <NotificationItem notification={notification} />
                  {index < notifications.length - 1 && (
                    <div className='mx-6'>
                      <Separator />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className='py-8 text-center'>
              <p className='text-sm text-muted-foreground'>
                {t('notification.list.empty')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationList
