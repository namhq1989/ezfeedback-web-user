import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { Blocks, Plus } from 'lucide-react'

interface IEmptyCategoriesStateProps {
  onAddCategory: () => void
}

const EmptyCategoriesState = ({
  onAddCategory,
}: IEmptyCategoriesStateProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <div className='mb-4'>
        <Blocks size={64} strokeWidth={1} />
      </div>
      <h3 className='text-base font-medium'>
        {t('admin:categories.empty.title')}
      </h3>
      <p className='text-sm text-muted-foreground mt-1 mb-6'>
        {t('admin:categories.empty.description')}
      </p>
      <Button size='sm' onClick={onAddCategory}>
        <Plus className='mr-2 h-4 w-4' />
        {t('admin:categories.addCategory')}
      </Button>
    </div>
  )
}

export default EmptyCategoriesState
