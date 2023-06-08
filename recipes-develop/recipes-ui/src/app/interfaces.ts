export interface User {
  id?: number
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  password?: string
}

export interface AuthState {
  state: boolean
  userid: string
  username: string
}
