import App from '@/app.tsx'
import '@/assets/stylesheets/global.css'
import { ThemeProvider } from '@/components/theme/theme.tsx'
import '@/i18n/i18n'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'

const Loading = () => (
  <div className='flex h-screen w-screen items-center justify-center'>
    <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Toaster />
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
