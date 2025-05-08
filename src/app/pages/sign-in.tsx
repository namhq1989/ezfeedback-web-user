import EmailForm from '@/app/components/auth/email-form'
import VerificationForm from '@/app/components/auth/verification-form'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from '@/i18n'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'

import Logo from '@/assets/images/logo.png'

const SignInPage = () => {
  const [step, setStep] = useState<'email' | 'verification'>('email')
  const [email, setEmail] = useState('')
  const { t } = useTranslation('auth')
  const navigate = useNavigate()

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail)
    setStep('verification')
  }

  const handleVerificationSuccess = () => {
    navigate('/')
  }

  const handleBackToEmail = () => {
    setStep('email')
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Main content */}
      <div className='flex flex-1 items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='mb-8 flex justify-center'>
            <img src={Logo} alt='EzFeedback Logo' className='h-30 w-auto' />
          </div>

          <Card className='flex flex-col gap-8 border-border/40 py-12 px-2'>
            <CardHeader className='text-center'>
              <h1 className='text-2xl font-bold tracking-tight'>
                {t(
                  `${step === 'email' ? 'emailForm' : 'verificationForm'}.title`,
                )}
              </h1>
              <p className='text-sm text-muted-foreground'>
                {t(
                  `${step === 'email' ? 'emailForm' : 'verificationForm'}.subtitle`,
                )}
              </p>
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
                    <VerificationForm
                      email={email}
                      onSuccess={handleVerificationSuccess}
                      onBack={handleBackToEmail}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <div className='px-8 my-2'>
              <Separator />
            </div>

            <CardFooter className='flex flex-row gap-8 justify-between items-center'>
              <p className='text-sm text-muted-foreground'>
                <Trans
                  i18nKey='auth:signIn.disclaimer'
                  components={{
                    termsLink: (
                      <Link
                        to='/terms'
                        className='underline hover:text-primary'
                      />
                    ),
                    privacyLink: (
                      <Link
                        to='/privacy'
                        className='underline hover:text-primary'
                      />
                    ),
                  }}
                />
              </p>
              <LanguageSwitcher />
            </CardFooter>
          </Card>
          {/* Footer */}
          <footer className='py-6 text-center text-xs text-muted-foreground'>
            © {new Date().getFullYear()} Easy Feedback. {t('signIn.copyright')}
          </footer>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
