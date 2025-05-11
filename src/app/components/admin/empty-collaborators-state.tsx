import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { Users } from 'lucide-react'

interface IEmptyCollaboratorsStateProps {
  onAddCollaborator: () => void
}

const EmptyCollaboratorsState = ({ onAddCollaborator }: IEmptyCollaboratorsStateProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col items-center justify-center py-8'>
      <div className='rounded-full bg-muted p-3 mb-4'>
        <Users className='h-6 w-6 text-muted-foreground' />
      </div>
      <h3 className='text-lg font-medium mb-2'>
        {t('admin:collaborators.emptyTitle')}
      </h3>
      <p className='text-sm text-muted-foreground text-center mb-4 max-w-md'>
        {t('admin:collaborators.emptyDescription')}
      </p>
      <Button onClick={onAddCollaborator}>
        {t('admin:collaborators.addCollaborator')}
      </Button>
    </div>
  )
}

export default EmptyCollaboratorsState
