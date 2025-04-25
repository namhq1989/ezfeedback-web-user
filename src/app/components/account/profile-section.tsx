import type { IUser } from '@/app/models/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/i18n'
import { useState } from 'react'

interface IProfileSectionProps {
  user: IUser
}

const ProfileSection = ({ user }: IProfileSectionProps) => {
  const { t } = useTranslation()
  const [name, setName] = useState(user.name)
  const [nameError, setNameError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleNameChange = (val: string) => {
    setName(val)
    if (!val.trim()) setNameError(t('account.profile.nameRequired'))
    else if (val.trim().length < 2)
      setNameError(t('account.profile.nameMinLength'))
    else setNameError('')
  }

  const handleSave = () => {
    if (nameError) return

    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      // Here you would typically make an API call to update the user's profile
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('account.profile.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-4'>
          {/* Name row */}
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
              <span className='text-sm'>{t('account.profile.name')}</span>
            </div>
            <div className='w-full sm:w-1/2'>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={nameError ? 'border-destructive' : ''}
                placeholder={t('account.profile.namePlaceholder')}
              />
              {nameError && (
                <div className='text-destructive text-xs mt-1'>{nameError}</div>
              )}
            </div>
          </div>

          {/* Email row */}
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
              <span className='text-sm'>{t('account.profile.email')}</span>
            </div>
            <div className='w-full sm:w-1/2'>
              <div className='flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm'>
                {user.email}
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className='flex justify-end'>
            <Button onClick={handleSave} disabled={!!nameError || isSaving}>
              {isSaving ? t('messages.saving') : t('account.profile.save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection
