import { SetMetadata } from '@nestjs/common'
import { ActionsKeys, ScopeKeys } from 'src/@shared/types/permissions'

export const CHECK_PERMISSIONS = 'check_permissions'

export interface RequiredRule {
  action: ActionsKeys
  subject: ScopeKeys
  conditions?: any
}

export const CheckPermissions = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_PERMISSIONS, requirements)
