import { create } from 'zustand/react'

export interface IAuthStore {
  getAuth: () => boolean
  setAuth: (isAuthenticated: boolean) => void
  getToken: () => string
}

const useAuthStore = create<IAuthStore>(() => ({
  getAuth: (): boolean => {
    return localStorage.getItem('isAuthenticated') === 'true'
  },
  setAuth: (isAuthenticated: boolean) => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated))
  },
  getToken: (): string => {
    return localStorage.getItem('token') || ''
  },
}))

export default useAuthStore
