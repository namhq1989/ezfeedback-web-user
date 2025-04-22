import { createRoot } from 'react-dom/client'
import '@/assets/stylesheets/global.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme/theme.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
    <Toaster />
    <App />
  </ThemeProvider>
)
