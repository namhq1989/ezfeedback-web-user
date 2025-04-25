import type { IUser } from '@/app/models/user'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from '@/i18n'

const PLAN_LIMITS = {
  Free: {
    maxProjects: 1,
    maxFeedback: 50,
  },
  Growth: {
    maxProjects: 10,
    maxFeedback: 1000,
  },
  Pro: {
    maxProjects: Infinity,
    maxFeedback: Infinity,
  },
}

interface ISubscriptionSectionProps {
  user: IUser
}

const SubscriptionSection = ({ user }: ISubscriptionSectionProps) => {
  const { t } = useTranslation()

  // Calculate usage percentages
  const projectPercentage =
    PLAN_LIMITS[user.plan].maxProjects === Infinity
      ? 0
      : (user.usage.projectCount / PLAN_LIMITS[user.plan].maxProjects) * 100

  const feedbackPercentage =
    PLAN_LIMITS[user.plan].maxFeedback === Infinity
      ? 0
      : (user.usage.feedbackCount / PLAN_LIMITS[user.plan].maxFeedback) * 100

  // Get plan color
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Free':
        return 'bg-gray-100 text-gray-800'
      case 'Growth':
        return 'bg-blue-100 text-blue-800'
      case 'Pro':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('billing.subscription.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-8'>
          {/* Current Plan */}
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
              <span className='text-sm'>
                {t('billing.subscription.currentPlan')}
              </span>
            </div>
            <div className='w-full sm:w-1/2 flex items-center gap-4'>
              <Badge className={`${getPlanColor(user.plan)} border-0`}>
                {t(`billing.subscription.plans.${user.plan.toLowerCase()}`)}
              </Badge>
              <Button variant='link' className='h-auto p-0 text-xs underline'>
                {t('billing.subscription.changePlan')}
              </Button>
            </div>
          </div>

          <Separator />

          <div className='flex flex-col gap-4'>
            {/* Projects Usage */}
            <div className='flex flex-col sm:flex-row items-center justify-center'>
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <div className='flex flex-col'>
                  <span className='text-sm'>
                    {t('billing.subscription.projects')}
                  </span>
                  <span className='text-xs text-muted-foreground mt-1'>
                    {t('billing.subscription.projectsDescription')}
                  </span>
                </div>
              </div>
              <div className='w-full sm:w-1/2'>
                <div className='flex flex-col gap-2'>
                  <div className='text-sm font-medium'>
                    {user.usage.projectCount} /
                    {PLAN_LIMITS[user.plan].maxProjects === Infinity
                      ? '∞'
                      : PLAN_LIMITS[user.plan].maxProjects}
                  </div>
                  {PLAN_LIMITS[user.plan].maxProjects !== Infinity && (
                    <Progress value={projectPercentage} className='h-2' />
                  )}
                </div>
              </div>
            </div>

            {/* Feedbacks Usage */}
            <div className='flex flex-col sm:flex-row items-center justify-center'>
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <div className='flex flex-col'>
                  <span className='text-sm'>
                    {t('billing.subscription.feedbacks')}
                  </span>
                  <span className='text-xs text-muted-foreground mt-1'>
                    {t('billing.subscription.feedbacksDescription')}
                  </span>
                </div>
              </div>
              <div className='w-full sm:w-1/2'>
                <div className='flex flex-col gap-2'>
                  <div className='text-sm font-medium'>
                    {user.usage.feedbackCount} /
                    {PLAN_LIMITS[user.plan].maxFeedback === Infinity
                      ? '∞'
                      : PLAN_LIMITS[user.plan].maxFeedback.toLocaleString()}
                  </div>
                  {PLAN_LIMITS[user.plan].maxFeedback !== Infinity && (
                    <Progress value={feedbackPercentage} className='h-2' />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSection
