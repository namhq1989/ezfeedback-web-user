import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Language, useLanguage } from '@/i18n/hooks/use-language'
import { Globe } from 'lucide-react'
import React from 'react'

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguageInfo, languages, changeLanguage } = useLanguage()

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language.code)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='flex items-center gap-2'>
          <Globe className='h-4 w-4' />
          <span>{currentLanguageInfo.flag}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className='flex items-center gap-2 cursor-pointer'
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
