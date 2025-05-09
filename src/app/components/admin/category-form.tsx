import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/i18n'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ICategoryFormProps {
  initialValue?: string
  onSave: (name: string) => void
  onCancel: () => void
  isLoading?: boolean
}

const CategoryForm = ({
  initialValue = '',
  onSave,
  onCancel,
  isLoading = false,
}: ICategoryFormProps) => {
  const { t } = useTranslation()
  const [name, setName] = useState(initialValue)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError(t('admin:categories.errors.nameRequired'))
      return
    }

    onSave(name.trim())
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mb-6'>
      <div className='space-y-2'>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError('')
          }}
          placeholder={t('admin:categories.form.namePlaceholder')}
          className={error ? 'border-destructive' : ''}
          autoFocus
        />
        {error && <p className='text-sm text-destructive'>{error}</p>}
      </div>

      <div className='flex justify-end space-x-2'>
        <Button
          type='button'
          variant='ghost'
          onClick={onCancel}
          disabled={isLoading}
        >
          {t('common.cancel')}
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {t('common.save')}
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
