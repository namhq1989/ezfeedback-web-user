import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

interface VerificationFormProps {
  email: string
  onSuccess: () => void
  onBack: () => void
}

const RESEND_COUNTDOWN = 5

const VerificationForm = ({ onSuccess, onBack }: VerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(RESEND_COUNTDOWN)
  const { t } = useTranslation('auth')

  // Create validation schema with translated messages
  const formSchema = z.object({
    code: z
      .string()
      .length(6, t('validation.invalidCode'))
      .regex(/^\d+$/, t('validation.codeFormat')),
  })

  type VerificationFormValues = z.infer<typeof formSchema>

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Here you would make the API call to verify the code
      // For now, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful verification
      toast.success(t('verificationForm.success'))
      onSuccess()
    } catch (error) {
      toast.error(t('verificationForm.invalidCode'))
      console.error('Error verifying code:', error)
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setResendLoading(true)

    try {
      // Here you would make the API call to resend the verification code
      // For now, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success(t('verificationForm.resendSuccess'))
      setResendCountdown(RESEND_COUNTDOWN)
    } catch (error) {
      toast.error(t('verificationForm.resendError'))
      console.error('Error resending verification code:', error)
    } finally {
      setResendLoading(false)
    }
  }

  // Countdown effect for resend button
  useEffect(() => {
    if (resendCountdown === 0) return
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCountdown])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('verificationForm.codePlaceholder')}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {t('verificationForm.verifying')}
            </>
          ) : (
            t('signIn.button')
          )}
        </Button>

        <div className='flex justify-between items-center text-sm'>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onBack}
            disabled={isLoading || resendLoading}
            className='px-0'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            {t('verificationForm.back')}
          </Button>

          <Button
            type='button'
            variant='link'
            size='sm'
            onClick={handleResendCode}
            disabled={isLoading || resendLoading || resendCountdown > 0}
          >
            {resendLoading ? (
              <>
                <Loader2 className='mr-1 h-3 w-3 animate-spin' />
                {t('verificationForm.resending')}
              </>
            ) : resendCountdown > 0 ? (
              t('verificationForm.resendCountdown', {
                seconds: resendCountdown,
              })
            ) : (
              t('verificationForm.resendCode')
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default VerificationForm
