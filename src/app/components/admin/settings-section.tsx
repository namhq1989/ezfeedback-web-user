import { IProjectSetting } from '@/app/models/project'
import useProjectStore from '@/app/stores/project'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import ColorPicker from './color-picker'

const SettingsSection = () => {
  const { t } = useTranslation()
  const {
    selectedProject,
    updateProject,
    changeProjectStatus,
    isUpdatingProject,
  } = useProjectStore()

  // Local state for project data
  const [projectTitle, setProjectTitle] = useState(selectedProject?.title || '')
  const [projectDescription, setProjectDescription] = useState(
    selectedProject?.description || '',
  )
  const [localSettings, setLocalSettings] = useState<IProjectSetting | null>(
    null,
  )
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(
    null,
  )
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [domainError, setDomainError] = useState<string | null>(null)

  const colorPickerRef = useRef<HTMLDivElement>(null)

  // Update local state when selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      setProjectTitle(selectedProject.title || '')
      setProjectDescription(selectedProject.description || '')
      if (selectedProject.setting) {
        setLocalSettings(selectedProject.setting)
      }
    }
  }, [selectedProject])

  // Handle click outside color picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setActiveColorPicker(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Validate domain format
  const validateDomain = (domain: string): boolean => {
    if (!domain.trim()) {
      setDomainError(t('admin:settings.domain.errorRequired'))
      return false
    }

    // Remove protocol if present
    let domainToCheck = domain.trim()
    if (domainToCheck.startsWith('http://')) {
      domainToCheck = domainToCheck.substring(7)
    } else if (domainToCheck.startsWith('https://')) {
      domainToCheck = domainToCheck.substring(8)
    }

    // Remove path if present
    domainToCheck = domainToCheck.split('/')[0]

    // Basic domain validation - can be enhanced as needed
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    if (!domainRegex.test(domainToCheck)) {
      setDomainError(t('admin:settings.domain.errorInvalid'))
      return false
    }

    setDomainError(null)
    return true
  }

  // Update project with local state
  const handleUpdateProject = async () => {
    if (!selectedProject || !localSettings) return

    // Validate domain before updating
    if (!validateDomain(localSettings.domain || '')) {
      return
    }

    // Ensure domain doesn't have protocol
    let cleanDomain = localSettings.domain || ''
    if (cleanDomain.startsWith('http://')) {
      cleanDomain = cleanDomain.substring(7)
    } else if (cleanDomain.startsWith('https://')) {
      cleanDomain = cleanDomain.substring(8)
    }

    // Remove path if present
    cleanDomain = cleanDomain.split('/')[0]

    try {
      // Create a copy of the request data
      const requestData = {
        title: projectTitle,
        description: projectDescription,
        domain: cleanDomain,
        primaryColor: localSettings.primaryColor,
      }

      // Make the API call
      await updateProject(requestData)

      // Update local state with the clean domain
      setLocalSettings({
        ...localSettings,
        domain: cleanDomain,
      })

      // Update the project in the local state without changing the reference
      if (selectedProject) {
        selectedProject.title = projectTitle
        selectedProject.description = projectDescription
        if (selectedProject.setting) {
          selectedProject.setting.domain = cleanDomain
          selectedProject.setting.primaryColor = localSettings.primaryColor
        }
      }

      toast.success(t('admin:settings.updateSuccess'))
    } catch (error: any) {
      const errorMessage = error?.message || t('admin:settings.updateError')
      toast.error(errorMessage)
      console.error('Failed to update project:', error)
    }
  }

  // Show confirmation dialog for status toggle
  const handleStatusToggleRequest = () => {
    setShowStatusDialog(true)
  }

  // Toggle project status after confirmation
  const handleToggleStatus = async () => {
    if (!selectedProject) return

    try {
      // Store the new status
      const newStatus =
        selectedProject.status === 'active' ? 'inactive' : 'active'

      // Close dialog before API call to prevent UI freeze
      setShowStatusDialog(false)

      // Make API call - don't update local state first to avoid collaborators section reload
      await changeProjectStatus(newStatus)

      // Update only the status in the local state
      if (selectedProject) {
        // Create a new object with the same reference to avoid triggering useEffect in other components
        selectedProject.status = newStatus
        // Force a re-render of this component
        setProjectTitle(projectTitle)
      }

      toast.success(t('admin:settings.statusUpdateSuccess'))
    } catch (error: any) {
      const errorMessage =
        error?.message || t('admin:settings.statusUpdateError')
      toast.error(errorMessage)
      console.error('Failed to update project status:', error)
    }
  }

  // Update local settings
  const handleUpdateSetting = (key: keyof IProjectSetting, value: string) => {
    if (!localSettings) return

    setLocalSettings({
      ...localSettings,
      [key]: value,
    })

    // Clear domain error when user starts typing
    if (key === 'domain') {
      setDomainError(null)
    }
  }

  // Settings options configuration
  const getSettingsOptions = (t: any) => [
    {
      key: 'domain' as keyof IProjectSetting,
      title: t('admin:settings.domain.title'),
      description: t('admin:settings.domain.description'),
      type: 'text',
    },
    {
      key: 'primaryColor' as keyof IProjectSetting,
      title: t('admin:settings.primaryColor.title'),
      description: t('admin:settings.primaryColor.description'),
      type: 'color',
    },
  ]

  if (!selectedProject) {
    return null
  }

  return (
    <div className='w-full border rounded-xl'>
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t('admin:settings.status.confirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedProject.status === 'active'
                ? t('admin:settings.status.confirmDeactivate')
                : t('admin:settings.status.confirmActivate')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin:common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus}>
              {t('admin:settings.status.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className='h-11 flex items-center px-4 sm:px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('admin:settings.title')}
        </h3>
      </div>
      <div className='p-4 sm:p-6'>
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
                    onCheckedChange={handleStatusToggleRequest}
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
                  {opt.type === 'color' ? (
                    <div className='relative'>
                      <div
                        className='flex items-center space-x-2 cursor-pointer'
                        onClick={() =>
                          setActiveColorPicker(
                            activeColorPicker === opt.key ? null : opt.key,
                          )
                        }
                      >
                        <div
                          className='w-8 h-5 rounded-xl border'
                          style={{
                            backgroundColor:
                              (localSettings && localSettings[opt.key]) ||
                              '#1DA1F2',
                          }}
                        />
                        <span className='text-sm'>
                          {(localSettings && localSettings[opt.key]) ||
                            '#1DA1F2'}
                        </span>
                      </div>
                      {activeColorPicker === opt.key && (
                        <div
                          className='absolute z-10 mt-2 bg-background rounded-xl border p-2'
                          ref={colorPickerRef}
                        >
                          <ColorPicker
                            color={
                              (localSettings && localSettings[opt.key]) ||
                              '#1DA1F2'
                            }
                            onChange={(color: string) => {
                              handleUpdateSetting(
                                opt.key as keyof IProjectSetting,
                                color,
                              )
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      value={
                        (localSettings &&
                          localSettings[opt.key as keyof IProjectSetting]) ||
                        ''
                      }
                      onChange={(e) =>
                        handleUpdateSetting(opt.key, e.target.value)
                      }
                      className={`w-full ${domainError && opt.key === 'domain' ? 'border-red-500' : ''}`}
                      placeholder={
                        t(`admin:settings.${opt.key}.placeholder`) ||
                        `${t(`admin:settings.${opt.key}.title`)}...`
                      }
                    />
                  )}
                  {domainError && opt.key === 'domain' && (
                    <p className='text-xs text-red-500 mt-1'>{domainError}</p>
                  )}
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
