import iamApi, {
  IGetMeRequest,
  IRequestVerificationCodeRequest,
  IVerifyVerificationCodeRequest,
} from '@/app/api/iam'
import { IMe } from '@/app/models/user'
import { create } from 'zustand/react'

export interface IAuthStore {
  me: IMe | null
  isAuthenticated: () => boolean
  setToken: (token: string) => void
  getToken: () => string
  signOut: () => void
  requestVerificationCode: (email: string) => Promise<void>
  verifyVerificationCode: (
    code: string,
    email: string,
  ) => Promise<{ isNewUser: boolean }>
  getMe: () => Promise<IMe>
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  me: null,
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },
  setToken: (token: string) => {
    localStorage.setItem('token', token)
  },
  getToken: () => {
    return localStorage.getItem('token') || ''
  },
  signOut: () => {
    localStorage.removeItem('token')
  },
  requestVerificationCode: async (email: string) => {
    try {
      const request: IRequestVerificationCodeRequest = { email }
      await iamApi.requestVerificationCode(request)
    } catch (error) {
      throw error
    }
  },
  verifyVerificationCode: async (code: string, email: string) => {
    try {
      const request: IVerifyVerificationCodeRequest = { code, email }
      const response = await iamApi.verifyVerificationCode(request)

      get().setToken(response.token)
      return { isNewUser: response.isNewUser }
    } catch (error) {
      throw error
    }
  },
  getMe: async () => {
    try {
      const request: IGetMeRequest = {}
      const response = await iamApi.getMe(request)
      set({ me: response.me })
      return response.me
    } catch (error) {
      throw error
    }
  },
}))

export default useAuthStore
