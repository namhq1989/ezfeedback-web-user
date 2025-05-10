import { IProjectSetting } from '@/app/models/project'
import useProjectStore from '@/app/stores/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SettingsSection = () => {
  const { t } = useTranslation()
  const {
    selectedProject,
    setSelectedProject,
    updateProject,
    changeProjectStatus,
    isUpdatingProject,
  } = useProjectStore()
  const [projectTitle, setProjectTitle] = useState(selectedProject?.title || '')
  const [projectDescription, setProjectDescription] = useState(
    selectedProject?.description || '',
  )

  useEffect(() => {
    if (selectedProject) {
      setProjectTitle(selectedProject.title || '')
      setProjectDescription(selectedProject.description || '')
    }
  }, [selectedProject])

  const handleUpdateProject = async () => {
    if (!selectedProject || !selectedProject.setting) return

    try {
      await updateProject({
        title: projectTitle,
        description: projectDescription,
        domain: selectedProject.setting.domain,
        primaryColor: selectedProject.setting.primaryColor,
      })

      toast.success(t('admin:settings.updateSuccess'))
    } catch (error: any) {
      const errorMessage = error?.message || t('admin:settings.updateError')
      toast.error(errorMessage)
      console.error('Failed to update project:', error)
    }
  }

  const handleToggleStatus = async () => {
    if (!selectedProject) return

    try {
      await changeProjectStatus(
        selectedProject.status === 'active' ? 'inactive' : 'active',
      )

      toast.success(t('admin:settings.statusUpdateSuccess'))
    } catch (error: any) {
      const errorMessage =
        error?.message || t('admin:settings.statusUpdateError')
      toast.error(errorMessage)
      console.error('Failed to update project status:', error)
    }
  }

  const handleUpdateSetting = (key: keyof IProjectSetting, value: string) => {
    if (!selectedProject || !selectedProject.setting) return

    setSelectedProject({
      ...selectedProject,
      setting: {
        ...selectedProject.setting,
        [key]: value,
      },
    })
  }

  const getSettingsOptions = (t: any) => [
    {
      key: 'domain' as keyof IProjectSetting,
      title: t('admin:settings.domain.title'),
      description: t('admin:settings.domain.description'),
    },
    {
      key: 'primaryColor' as keyof IProjectSetting,
      title: t('admin:settings.primaryColor.title'),
      description: t('admin:settings.primaryColor.description'),
    },
  ]

  if (!selectedProject) {
    return null
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('admin:settings.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-4'>
            {/* Project Info */}
            <div className='flex flex-col sm:flex-row items-center'>
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <span className='text-sm'>
                  {t('admin:settings.projectTitle.title')}
                </span>
              </div>
              <div className='w-full sm:w-1/2'>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className='w-full'
                  placeholder={t('admin:settings.projectTitle.placeholder')}
                />
              </div>
            </div>

            {/* Project Description */}
            <div className='flex flex-col sm:flex-row items-center'>
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <span className='text-sm'>
                  {t('admin:settings.description.title')}
                </span>
              </div>
              <div className='w-full sm:w-1/2'>
                <Input
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className='w-full'
                  placeholder={t('admin:settings.description.placeholder')}
                />
              </div>
            </div>

            {/* Status Switch */}
            <div className='flex flex-col sm:flex-row items-center mt-8'>
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <span className='text-sm'>
                  {t('admin:settings.status.title')}
                </span>
              </div>
              <div className='w-full sm:w-1/2'>
                <div className='flex items-center space-x-2'>
                  <Switch
                    checked={selectedProject.status === 'active'}
                    onCheckedChange={() => handleToggleStatus()}
                    disabled={isUpdatingProject}
                  />
                  <span className='text-sm'>
                    {selectedProject.status === 'active'
                      ? t('admin:settings.status.active')
                      : t('admin:settings.status.inactive')}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Settings Options */}
            {getSettingsOptions(t).map((opt) => (
              <div
                key={opt.key}
                className='flex flex-col sm:flex-row items-center'
              >
                <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                  <span className='text-sm'>
                    {t(`admin:settings.${opt.key}.title`)}
                  </span>
                </div>
                <div className='w-full sm:w-1/2'>
                  <Input
                    value={
                      selectedProject.setting[
                        opt.key as keyof IProjectSetting
                      ] || ''
                    }
                    onChange={(e) =>
                      handleUpdateSetting(
                        opt.key as keyof IProjectSetting,
                        e.target.value,
                      )
                    }
                    placeholder={t(`admin:settings.${opt.key}.title`)}
                    className='w-full'
                  />
                </div>
              </div>
            ))}

            {/* Save Button */}
            <div className='flex justify-end'>
              <Button
                size='sm'
                onClick={handleUpdateProject}
                disabled={isUpdatingProject}
              >
                {isUpdatingProject
                  ? t('common:messages.saving')
                  : t('common:common.save')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsSection
