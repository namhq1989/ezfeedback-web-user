import { create } from 'zustand/react'

export interface IAuthStore {
  isAuthenticated: boolean
  setAuth: (isAuthenticated: boolean) => void
  getToken: () => string
}

const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  setAuth: (isAuthenticated: boolean) => set({ isAuthenticated }),
  getToken: () => {
    return localStorage.getItem('token') || ''
  },
}))

export default useAuthStore
