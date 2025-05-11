import CollaboratorItem from '@/app/components/admin/collaborator-item'
import Spinner from '@/app/components/root/spinner'
import useProjectStore from '@/app/stores/project'
import { useTranslation } from '@/i18n'
import { useEffect } from 'react'

const CollaboratorsSection = () => {
  const { t } = useTranslation()
  const {
    selectedProject,
    collaborators,
    isLoadingCollaborators,
    getProjectCollaborators,
  } = useProjectStore()

  useEffect(() => {
    if (selectedProject) {
      getProjectCollaborators()
    }
  }, [selectedProject])

  // We'll use isLoadingCollaborators directly

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('admin:collaborators.title')}
        </h3>
      </div>
      <div className='px-6 py-4'>
        {isLoadingCollaborators ? (
          <div className='flex justify-center py-8'>
            <Spinner size='md' />
          </div>
        ) : collaborators.length === 0 ? (
          <div className='flex justify-center py-8 text-sm text-muted-foreground'>
            {t('admin:collaborators.noCollaborators')}
          </div>
        ) : (
          <div className='space-y-4'>
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className='py-4 border-b last:border-0'
              >
                <CollaboratorItem collaborator={collaborator} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollaboratorsSection
