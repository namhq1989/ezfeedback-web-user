import EmailForm from '@/app/components/auth/email-form'
import VerificationForm from '@/app/components/auth/verification-form'
import useAuthStore from '@/app/stores/auth-store'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/i18n'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import Logo from '@/assets/images/logo.png'

const SignInPage = () => {
  const [step, setStep] = useState<'email' | 'verification'>('email')
  const [email, setEmail] = useState('')
  const { t } = useTranslation('auth')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setStep('verification')
  }

  const handleVerificationSuccess = () => {
    setAuth(true)
    navigate('/')
  }

  const handleBackToEmail = () => {
    setStep('email')
  }

  return (
    <div className='flex min-h-screen flex-col bg-muted/40'>
      {/* Language switcher in top right */}
      <div className='absolute top-4 right-4'>
        <LanguageSwitcher />
      </div>

      {/* Main content */}
      <div className='flex flex-1 items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='mb-8 flex justify-center'>
            <img src={Logo} alt='EzFeedback Logo' className='h-16 w-auto' />
          </div>

          <Card className='border-border/40 shadow-lg'>
            <CardHeader className='space-y-2 text-center'>
              <h1 className='text-2xl font-bold tracking-tight'>
                {t('title')}
              </h1>
              <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode='wait'>
                {step === 'email' ? (
                  <motion.div
                    key='email-step'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className='mb-4 text-sm text-muted-foreground'>
                      {t('instructions.email')}
                    </p>
                    <EmailForm onSubmit={handleEmailSubmit} />
                  </motion.div>
                ) : (
                  <motion.div
                    key='verification-step'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className='mb-4 text-sm text-muted-foreground'>
                      {t('instructions.code')}
                    </p>
                    <VerificationForm
                      email={email}
                      onSuccess={handleVerificationSuccess}
                      onBack={handleBackToEmail}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4 border-t px-6 py-4'>
              <Separator />
              <p className='text-center text-xs text-muted-foreground'>
                {t('signIn.disclaimer')}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className='py-6 text-center text-xs text-muted-foreground'>
        © {new Date().getFullYear()} EzFeedback. {t('signIn.copyright')}
      </footer>
    </div>
  )
}

export default SignInPage
