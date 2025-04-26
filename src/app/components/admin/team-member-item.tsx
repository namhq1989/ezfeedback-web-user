import { ITeamMember } from '@/app/models/admin'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ITeamMemberItemProps {
  member: ITeamMember
}

const TeamMemberItem = ({ member }: ITeamMemberItemProps) => {

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className='flex items-center space-x-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className='font-medium text-sm'>{member.name}</p>
        <p className='text-xs text-muted-foreground'>{member.email}</p>
      </div>
    </div>
  )
}

export default TeamMemberItem
