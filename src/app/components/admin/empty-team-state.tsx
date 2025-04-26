import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { Plus } from 'lucide-react'

interface IEmptyTeamStateProps {
  onInviteMember: () => void
}

const EmptyTeamState = ({ onInviteMember }: IEmptyTeamStateProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <div className='mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='64'
          height='64'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-muted-foreground'
        >
          <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
          <circle cx='9' cy='7' r='4' />
          <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
          <path d='M16 3.13a4 4 0 0 1 0 7.75' />
        </svg>
      </div>
      <h3 className='text-lg font-medium'>{t('admin:team.empty.title')}</h3>
      <p className='text-muted-foreground mt-2 mb-4'>
        {t('admin:team.empty.description')}
      </p>
      <Button onClick={onInviteMember}>
        <Plus className='mr-2 h-4 w-4' />
        {t('admin:team.inviteMember')}
      </Button>
    </div>
  )
}

export default EmptyTeamState
