import { LanguagesTypesKeys } from './languages'
import { RoleKeys } from './permissions'

export interface Payload {
  data: {
    tenant: {
      id: string
      name: string
    }
    franchises: {
      id: string
      name: string
    }[]
    user: {
      id: string
      username: string
      email: string
      role: RoleKeys
      language: LanguagesTypesKeys
    }
  }
}
