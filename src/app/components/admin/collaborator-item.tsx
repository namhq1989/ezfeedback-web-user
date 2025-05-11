import { IProjectCollaborator } from '@/app/models/project'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'

interface ICollaboratorItemProps {
  collaborator: IProjectCollaborator
}

const CollaboratorItem = ({ collaborator }: ICollaboratorItemProps) => {
  const { t } = useTranslation()
  const { user, role } = collaborator

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  // No need for additional helper functions as we're using the select component directly

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center'>
        <Avatar className='h-8 w-8 mr-3'>
          <AvatarFallback className='text-xs'>
            {getInitials(user.name || user.email)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='text-sm font-medium'>{user.name || user.email}</span>
          {user.name && (
            <span className='text-xs text-muted-foreground'>{user.email}</span>
          )}
        </div>
      </div>
      {role !== 'owner' && (
        <div className='flex items-center'>
          <Select value={role} disabled={true}>
            <SelectTrigger className='h-8 text-xs w-[110px]'>
              <SelectValue placeholder={t('admin:collaborators.selectRole')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='editor'>
                {t('admin:collaborators.roles.editor')}
              </SelectItem>
              <SelectItem value='viewer'>
                {t('admin:collaborators.roles.viewer')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {role === 'owner' && (
        <div className='flex items-center'>
          <Select value={role} disabled={true}>
            <SelectTrigger className='h-8 text-xs w-[110px]'>
              <SelectValue placeholder={t('admin:collaborators.selectRole')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='owner'>
                {t('admin:collaborators.roles.owner')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default CollaboratorItem
