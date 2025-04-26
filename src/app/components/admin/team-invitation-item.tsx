import { ITeamInvitation } from '@/app/models/admin'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { RefreshCw, X } from 'lucide-react'

interface ITeamInvitationItemProps {
  invitation: ITeamInvitation
  onResend: () => void
  onCancel: () => void
}

const TeamInvitationItem = ({
  invitation,
  onResend,
  onCancel,
}: ITeamInvitationItemProps) => {
  const { t } = useTranslation()
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b last:border-0'>
      <div className='w-full sm:w-auto mb-3 sm:mb-0'>
        <p className='text-sm'>{invitation.email}</p>
        <div className='flex flex-wrap items-center gap-2 mt-1'>
          <span className='text-xs text-muted-foreground'>
            {invitation.role === 'OWNER'
              ? t('admin:team.roles.owner')
              : invitation.role === 'EDITOR'
                ? t('admin:team.roles.editor')
                : t('admin:team.roles.viewer')}
          </span>
          <span className='text-xs text-muted-foreground hidden sm:inline'>
            •
          </span>
          <span className='text-xs text-muted-foreground'>
            {t('admin:team.invitedOn', {
              date: formatDate(invitation.createdAt),
            })}
          </span>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto justify-end'>
        <Button
          variant='outline'
          size='sm'
          onClick={onResend}
          className='text-xs w-full sm:w-auto'
        >
          <RefreshCw className='h-3 w-3 mr-1' />
          <span className='sm:hidden'>{t('admin:team.resend')}</span>
          <span className='hidden sm:inline'>{t('admin:team.resend')}</span>
        </Button>
        <CancelInvitationDialog invitation={invitation} onCancel={onCancel} />
      </div>
    </div>
  )
}

interface ICancelInvitationDialogProps {
  invitation: ITeamInvitation
  onCancel: () => void
}

const CancelInvitationDialog = ({
  invitation,
  onCancel,
}: ICancelInvitationDialogProps) => {
  const { t } = useTranslation()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='sm' className='text-xs w-full sm:w-auto'>
          <X className='h-3 w-3 mr-1' />
          <span className='sm:hidden'>{t('admin:team.cancel')}</span>
          <span className='hidden sm:inline'>{t('admin:team.cancel')}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('admin:team.cancelInvitationTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('admin:team.cancelInvitationDescription', {
              email: invitation.email,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('admin:common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onCancel}>
            {t('admin:team.confirmCancel')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TeamInvitationItem
