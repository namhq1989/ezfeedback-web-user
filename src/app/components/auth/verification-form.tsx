import useAuthStore from '@/app/stores/auth'
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

interface IVerificationFormProps {
  email: string
  onSuccess: () => void
  onBack: () => void
}

const RESEND_COUNTDOWN = 60

const VerificationForm = ({
  email,
  onSuccess,
  onBack,
}: IVerificationFormProps) => {
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

  const handleSubmit = async (values: VerificationFormValues) => {
    setIsLoading(true)

    try {
      await useAuthStore.getState().verifyVerificationCode(values.code, email)

      // toast.success(t('verificationForm.success'))
      onSuccess()
    } catch (error: any) {
      const errorMessage = error?.message || t('verificationForm.invalidCode')
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setResendLoading(true)

    try {
      await useAuthStore.getState().requestVerificationCode(email)

      toast.success(t('verificationForm.resendSuccess'))
      setResendCountdown(RESEND_COUNTDOWN)
    } catch (error: any) {
      const errorMessage = error?.message || t('verificationForm.resendError')
      toast.error(errorMessage)
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
            className='text-xs'
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
