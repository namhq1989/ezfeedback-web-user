import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const RootPage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md border rounded-xl p-8 flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          {t('root.welcome')}
        </h1>
        
        <p className="text-center text-gray-500">
          {t('root.noProjects')}
        </p>
        
        <Button className="w-full flex items-center justify-center gap-2">
          <PlusCircle className="h-5 w-5" />
          {t('root.createProject')}
        </Button>
      </div>
    </div>
  )
}

export default RootPage
