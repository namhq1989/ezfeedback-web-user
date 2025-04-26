import { TeamMemberRoleType } from '@/app/models/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'
import { useState } from 'react'

interface IInviteMemberFormProps {
  onInvite: (email: string, role: TeamMemberRoleType) => void
  onCancel: () => void
}

const InviteMemberForm = ({ onInvite, onCancel }: IInviteMemberFormProps) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<TeamMemberRoleType>('EDITOR')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError(t('admin:team.errors.emailRequired'))
      return
    }

    if (!validateEmail(email)) {
      setError(t('admin:team.errors.invalidEmail'))
      return
    }

    onInvite(email.trim(), role)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 mb-6'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            placeholder={t('admin:team.form.emailPlaceholder')}
            className={error ? 'border-destructive' : ''}
            autoFocus
          />
          {error && <p className='text-sm text-destructive'>{error}</p>}
        </div>

        <Select
          value={role}
          onValueChange={(value: TeamMemberRoleType) => setRole(value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={t('admin:team.selectRole')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='EDITOR'>
              {t('admin:team.roles.editor')}
            </SelectItem>
            <SelectItem value='VIEWER'>
              {t('admin:team.roles.viewer')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end space-x-2'>
        <Button type='button' variant='ghost' onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type='submit'>{t('admin:team.invite')}</Button>
      </div>
    </form>
  )
}

export default InviteMemberForm
