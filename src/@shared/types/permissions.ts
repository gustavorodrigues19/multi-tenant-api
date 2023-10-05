export const ROLES = {
  MASTER_ADMIN: 'MASTER_ADMIN',
  ORGANIZATION_ADMIN: 'ORGANIZATION_ADMIN',
  FRANCHISE_ADMIN: 'FRANCHISE_ADMIN',
  COACH_ADMIN: 'COACH_ADMIN',
  CLIENT_ADMIN: 'CLIENT_ADMIN',
  FINANCE_ADMIN: 'FINANCE_ADMIN',
  ATHLETE_ADMIN: 'ATHLETE_ADMIN',
  CUSTOM_ADMIN: 'CUSTOM_ADMIN',
} as const
export type RoleKeys = (typeof ROLES)[keyof typeof ROLES]

export const SCOPES = {
  TENANTS: 'tenants',
  PLANS: 'plans',
  FRANCHISES: 'franchises',
  ADMINISTRATORS: 'administrators',
} as const
export type ScopeKeys = (typeof SCOPES)[keyof typeof SCOPES]

export const ACTIONS_PERMS = {
  ALL: '*',
  GROUP: '#',
  RESTRICT: '$',
} as const
export type ActionPermsKeys = (typeof ACTIONS_PERMS)[keyof typeof ACTIONS_PERMS]

export const ACTIONS = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
} as const
export type ActionsKeys = (typeof ACTIONS)[keyof typeof ACTIONS]
