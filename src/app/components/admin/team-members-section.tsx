import EmptyTeamState from '@/app/components/admin/empty-team-state'
import InviteMemberForm from '@/app/components/admin/invite-member-form'
import TeamInvitationItem from '@/app/components/admin/team-invitation-item'
import TeamMemberItem from '@/app/components/admin/team-member-item'
import {
  ITeamInvitation,
  ITeamMember,
  TeamMemberRoleType,
} from '@/app/models/admin'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'
import { Plus, UserMinus } from 'lucide-react'
import { useState } from 'react'

interface ITeamMembersSectionProps {
  initialMembers: ITeamMember[]
  initialInvitations: ITeamInvitation[]
  currentUserId: string
}

const TeamMembersSection = ({
  initialMembers,
  initialInvitations,
  currentUserId,
}: ITeamMembersSectionProps) => {
  const { t } = useTranslation()
  const [members, setMembers] = useState<ITeamMember[]>(initialMembers)
  const [invitations, setInvitations] =
    useState<ITeamInvitation[]>(initialInvitations)
  const [isInviting, setIsInviting] = useState(false)

  const handleInvite = (email: string, role: TeamMemberRoleType) => {
    const newInvitation = {
      id: `invitation-${Date.now()}`,
      email,
      role,
      createdAt: new Date(),
    }
    setInvitations([...invitations, newInvitation])
    setIsInviting(false)
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center justify-between px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>{t('admin:team.title')}</h3>
        <div
          onClick={() => setIsInviting(true)}
          className={`flex items-center cursor-pointer text-xs ${isInviting ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
        >
          <Plus className='mr-2 h-4 w-4' />
          <span>{t('admin:team.inviteMember')}</span>
        </div>
      </div>
      <div className='p-6'>
        {isInviting && (
          <InviteMemberForm
            onInvite={handleInvite}
            onCancel={() => setIsInviting(false)}
          />
        )}

        {members.length === 0 && !isInviting ? (
          <EmptyTeamState onInviteMember={() => setIsInviting(true)} />
        ) : (
          <div className='space-y-4'>
            <div>
              {members.map((member) => (
                <div
                  key={member.id}
                  className='flex flex-col sm:flex-row items-center py-6 border-b last:border-0'
                >
                  <div className='w-full sm:w-1/2'>
                    <TeamMemberItem member={member} />
                  </div>
                  <div className='w-full sm:w-1/2 flex items-center'>
                    <div className='w-[30%] flex items-center mt-4 sm:mt-0'>
                      <Select
                        value={member.role}
                        onValueChange={(value: TeamMemberRoleType) => {
                          setMembers(
                            members.map((m) =>
                              m.id === member.id ? { ...m, role: value } : m,
                            ),
                          )
                        }}
                        disabled={
                          member.id === currentUserId || member.role === 'OWNER'
                        }
                      >
                        <SelectTrigger className='h-8 text-xs w-[110px]'>
                          <SelectValue
                            placeholder={t('admin:team.selectRole')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='OWNER'>
                            {t('admin:team.roles.owner')}
                          </SelectItem>
                          <SelectItem value='EDITOR'>
                            {t('admin:team.roles.editor')}
                          </SelectItem>
                          <SelectItem value='VIEWER'>
                            {t('admin:team.roles.viewer')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='w-[70%] flex items-center justify-end'>
                      {member.id !== currentUserId &&
                        member.role !== 'OWNER' && (
                          <RemoveMemberDialog
                            member={member}
                            onRemove={() => {
                              setMembers(
                                members.filter((m) => m.id !== member.id),
                              )
                            }}
                          />
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {invitations.length > 0 && (
              <>
                {/* <Separator className='my-6' /> */}
                <div className='mt-12 space-y-2'>
                  <h3 className='text-sm font-medium'>
                    {t('admin:team.pendingInvitations')}
                  </h3>
                  <div className='space-y-3'>
                    {invitations.map((invitation) => (
                      <TeamInvitationItem
                        key={invitation.id}
                        invitation={invitation}
                        onResend={() => {
                          // In a real app, this would call an API to resend the invitation
                          console.log(`Resending invitation ${invitation.id}`)
                        }}
                        onCancel={() => {
                          setInvitations(
                            invitations.filter(
                              (inv) => inv.id !== invitation.id,
                            ),
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface IRemoveMemberDialogProps {
  member: ITeamMember
  onRemove: () => void
}

const RemoveMemberDialog = ({ member, onRemove }: IRemoveMemberDialogProps) => {
  const { t } = useTranslation()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant='ghost' size='icon'>
          <UserMinus className='h-4 w-4 text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('admin:team.removeConfirmTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('admin:team.removeConfirmDescription', {
              name: member.name,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('admin:common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onRemove}>
            {t('admin:team.remove')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TeamMembersSection
