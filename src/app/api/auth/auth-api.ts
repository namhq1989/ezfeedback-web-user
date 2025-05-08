import {
  IRequestVerificationCodeRequest,
  IRequestVerificationCodeResponse,
  IVerifyVerificationCodeRequest,
  IVerifyVerificationCodeResponse,
} from '@/app/api/auth/auth-types'
import useHttpStore from '@/core/http'

const API_PATHS = {
  REQUEST_VERIFICATION_CODE: 'api/iam/request-verification-code',
  VERIFY_VERIFICATION_CODE: 'api/iam/verify-verification-code',
}

const requestVerificationCode = async (
  data: IRequestVerificationCodeRequest,
) => {
  const { post } = useHttpStore.getState()
  return post<IRequestVerificationCodeResponse>(
    API_PATHS.REQUEST_VERIFICATION_CODE,
    data,
  )
}

const verifyVerificationCode = async (data: IVerifyVerificationCodeRequest) => {
  const { post } = useHttpStore.getState()
  return post<IVerifyVerificationCodeResponse>(
    API_PATHS.VERIFY_VERIFICATION_CODE,
    data,
  )
}

export default {
  requestVerificationCode,
  verifyVerificationCode,
}
