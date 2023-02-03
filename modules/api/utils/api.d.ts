export interface Endpoint {
  endpoint: string
  NOAH_SG_EN?: string
  ZOEY_SG_EN?: string
  NOAH_HK_EN?: string
  NOAH_HK_ZH?: string
}

export interface UserPayload {
  email?: string
  password?: string
  returnSecureToken?: true
  idToken?: string
  localId?: string
}

export interface PatientPayload {
  data?: {
    // country?: string
    email?: string
    firstName?: string
    fromPlatformEnv?: string
    fullname?: string
    lastName?: string
    // locale?: 'en' | 'zh'
    // dob?: string
  }
}
