import { Separator } from '@/components/ui/separator'
import { Check, ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebarHeader = ({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) => {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [dropdownWidth, setDropdownWidth] = React.useState<number | undefined>(
    undefined,
  )

  // When dropdown opens, set width
  React.useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth)
    }
  }, [triggerRef.current])

  return (
    <SidebarHeader className='flex items-center px-4 py-6'>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                ref={triggerRef}
                size='lg'
                className='flex gap-4 items-center justify-center'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                  <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                </div>
                <div className='flex flex-col gap-1 leading-none'>
                  <span className='font-semibold'>BapBi</span>
                  <span className='text-xs text-muted-foreground'>
                    2,395 feedback
                  </span>
                </div>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={dropdownWidth ? { width: dropdownWidth } : {}}
              align='start'
              className='flex flex-col gap-4 bg-background'
            >
              {versions.map((version) => (
                <DropdownMenuItem
                  key={version}
                  onSelect={() => setSelectedVersion(version)}
                  className='p-0'
                >
                  <button
                    type='button'
                    className='flex w-full gap-4 items-center px-4 py-2 gap-2'
                  >
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                      <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                    </div>
                    <div className='flex flex-col gap-1 leading-none text-left'>
                      <span className='font-semibold'>BapBi</span>
                      <span className='text-xs text-muted-foreground'>
                        2,395 feedback
                      </span>
                    </div>
                    {version === selectedVersion ? (
                      <Check className='ml-auto' />
                    ) : null}
                  </button>
                </DropdownMenuItem>
              ))}

              <Separator />
              <Button
                variant='ghost'
                size='lg'
                className='w-full flex items-center justify-start gap-2 mb-1 mt-[-8px]'
              >
                <div className='w-0' />
                <Plus className='size-4' />
                <span className='text-sm ml-1'>New Project</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default AppSidebarHeader
