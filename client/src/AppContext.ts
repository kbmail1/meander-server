import React from 'react'

export const enum Role {
  Guest = 0,
  Admin,
}
export interface IAppContext {
  isLoggedIn: boolean
  userId: string
  role: Role
  login: (creds: unknown) => boolean
  logout: (creds: unknown) => boolean
  sincpoch: number
}

export const starterAppContext: IAppContext = {
  isLoggedIn: false,
  userId: 'guestUser',
  role: 'guestRole',
  login: () => true,
  logout: () => true,
  sincpoch: Date.now(),
}

const AppContext = React.createContext<IAppContext | null>(null)

export default AppContext
