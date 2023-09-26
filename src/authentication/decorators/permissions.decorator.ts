import { SetMetadata } from '@nestjs/common'

export const CHECK_PERMISSIONS = 'check_permissions'

export interface RequiredRule {
  action: string
  subject: string
  conditions?: any
}

export const CheckPermissions = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_PERMISSIONS, requirements)
