export interface signUpUser {
  kind?: string
  idToken?: string
  email?: string
  refreshToken?: string
  expiresIn?: string
  localId?: string
}

export interface accountInfo {
  localId?: string
  email?: string
  passwordHash?: string
  emailVerified?: boolean
  passwordUpdatedAt?: number
  providerUserInfo?: string[]
  validSince?: string
  lastLoginAt?: string
  createdAt?: string
  lastRefreshAt?: string
}

export interface responseObject {
  status: string
  headers?: string
  data: {
    error?: string
  }
}
