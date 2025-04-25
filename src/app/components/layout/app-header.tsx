import AppSidebarTrigger from '@/app/components/layout/app-sidebar-trigger'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { FC } from 'react'

import { useBreadcrumb } from '@/app/router/use-breadcrumb'
import { useTranslation } from 'react-i18next'

const AppHeader: FC = () => {
  const breadcrumbTrail = useBreadcrumb()
  const { t } = useTranslation()
  // useBreadcrumb returns [projectName, pageLabel?]
  const projectName = breadcrumbTrail[0] || ''
  const pageLabel = breadcrumbTrail[1] ? t(breadcrumbTrail[1]) : ''

  const isSinglePath = breadcrumbTrail.length === 1

  return (
    <header className='w-full flex items-center h-[50px] px-6 py-2 border-b border-muted gap-6'>
      <AppSidebarTrigger />
      <Separator orientation='vertical' />
      <Breadcrumb>
        <BreadcrumbList>
          {isSinglePath ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{t(breadcrumbTrail[0])}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage>{projectName}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

export default AppHeader
