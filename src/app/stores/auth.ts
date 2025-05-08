import authApi from '@/app/api/auth/auth-api'
import {
  IRequestVerificationCodeRequest,
  IVerifyVerificationCodeRequest,
} from '@/app/api/auth/auth-types'
import { create } from 'zustand/react'

export interface IAuthStore {
  isAuthenticated: () => boolean
  setToken: (token: string) => void
  getToken: () => string
  signOut: () => void
  requestVerificationCode: (email: string) => Promise<void>
  verifyVerificationCode: (
    code: string,
    email: string,
  ) => Promise<{ isNewUser: boolean }>
}

const useAuthStore = create<IAuthStore>((_, get) => ({
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
      await authApi.requestVerificationCode(request)
    } catch (error) {
      throw error
    }
  },
  verifyVerificationCode: async (code: string, email: string) => {
    try {
      const request: IVerifyVerificationCodeRequest = { code, email }
      const response = await authApi.verifyVerificationCode(request)

      get().setToken(response.token)
      return { isNewUser: response.isNewUser }
    } catch (error) {
      throw error
    }
  },
}))

export default useAuthStore
