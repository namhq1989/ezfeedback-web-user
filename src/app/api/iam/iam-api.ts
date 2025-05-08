import {
  IGetMeRequest,
  IGetMeResponse,
  IRequestVerificationCodeRequest,
  IRequestVerificationCodeResponse,
  IVerifyVerificationCodeRequest,
  IVerifyVerificationCodeResponse,
} from '@/app/api/iam/iam-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/iam'

const API_PATHS = {
  REQUEST_VERIFICATION_CODE: `${API_PREFIX}/request-verification-code`,
  VERIFY_VERIFICATION_CODE: `${API_PREFIX}/verify-verification-code`,
  GET_ME: `${API_PREFIX}/me`,
}

const requestVerificationCode = async (
  data: IRequestVerificationCodeRequest,
) => {
  try {
    const { post } = useHttpStore.getState()
    return post<IRequestVerificationCodeResponse>(
      API_PATHS.REQUEST_VERIFICATION_CODE,
      data,
    )
  } catch (error) {
    throw error
  }
}

const verifyVerificationCode = async (data: IVerifyVerificationCodeRequest) => {
  try {
    const { post } = useHttpStore.getState()
    return post<IVerifyVerificationCodeResponse>(
      API_PATHS.VERIFY_VERIFICATION_CODE,
      data,
    )
  } catch (error) {
    throw error
  }
}

const getMe = async (params?: IGetMeRequest) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetMeResponse>(API_PATHS.GET_ME, params)
  } catch (error) {
    throw error
  }
}

export default {
  requestVerificationCode,
  verifyVerificationCode,
  getMe,
}
