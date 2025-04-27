import {
  INotification,
  NotificationType,
  NotificationTypeBilling,
  NotificationTypeFeedback,
  NotificationTypeOther,
  NotificationTypeSummary,
} from '@/app/models/notification'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTranslation } from '@/i18n'
import { formatTime } from '@/lib/date'
import {
  Bell,
  Check,
  CreditCard,
  FileBarChart,
  Send,
  Trash2,
} from 'lucide-react'
import { JSX, useState } from 'react'

const getIconComponent = (
  type: NotificationType,
  isRead: boolean,
): JSX.Element => {
  const iconClasses = `h-5 w-5 ${isRead ? 'text-muted-foreground' : 'text-primary'}`

  switch (type) {
    case NotificationTypeFeedback:
      return <Send className={iconClasses} />
    case NotificationTypeSummary:
      return <FileBarChart className={iconClasses} />
    case NotificationTypeBilling:
      return <CreditCard className={iconClasses} />
    case NotificationTypeOther:
    default:
      return <Bell className={iconClasses} />
  }
}

const getTranslationKey = (type: NotificationType): string => {
  switch (type) {
    case NotificationTypeFeedback:
      return 'notification.types.feedback'
    case NotificationTypeSummary:
      return 'notification.types.summary'
    case NotificationTypeBilling:
      return 'notification.types.billing'
    case NotificationTypeOther:
    default:
      return 'notification.types.other'
  }
}

export interface INotificationItemProps {
  notification: INotification
}

const NotificationItem = ({ notification }: INotificationItemProps) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    console.log('Notification clicked:', notification)
  }

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Mark as read:', notification.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Delete notification:', notification.id)
  }

  return (
    <div
      className={`flex items-center gap-4 py-4 px-6 cursor-pointer transition-colors duration-200`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex-shrink-0'>
        {getIconComponent(notification.type, notification.isRead)}
      </div>
      <div className='flex-1 hover:text-primary'>
        <h4
          className={`text-xs font-medium ${notification.isRead ? 'text-muted-foreground' : ''}`}
        >
          {t(getTranslationKey(notification.type))}
        </h4>
        <p className='text-sm text-muted-foreground mt-1'>
          {notification.content}
        </p>
      </div>
      <div className='flex-shrink-0 flex items-center gap-1'>
        {isHovered && (
          <>
            {!notification.isRead && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className='p-2 rounded-full transition-colors'
                      onClick={handleMarkAsRead}
                    >
                      <Check className='h-4 w-4 text-muted-foreground' />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t('notification.actions.markAsRead')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    className='p-2 rounded-full transition-colors'
                    onClick={handleDelete}
                  >
                    <Trash2 className='h-4 w-4 text-muted-foreground' />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {t('notification.actions.delete')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
        <div className='w-2'></div>
        <span className='text-xs text-muted-foreground'>
          {formatTime(notification.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default NotificationItem
