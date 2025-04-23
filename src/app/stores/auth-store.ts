import { create } from 'zustand/react'

export interface IAuthStore {
  isAuthenticated: boolean
  setAuth: (isAuthenticated: boolean) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  setAuth: (isAuthenticated: boolean) => set({ isAuthenticated }),
}))

export default useAuthStore
