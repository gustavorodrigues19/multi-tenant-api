import { Reflector } from '@nestjs/core'

import { ForcedSubject, ForbiddenError, MongoAbility } from '@casl/ability'

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import {
  CHECK_PERMISSIONS,
  RequiredRule,
} from 'src/authentication/decorators/permissions.decorator'
import { Payload } from 'src/@shared/types/payload'
import { PERMISSIONS_PER_ROLE } from './permissions'

export const actions = ['read', 'manage', 'create', 'update', 'delete'] as const

export const subjects = ['Story', 'User', 'all'] as const

export type Permissions = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
]

export type AppPermission = MongoAbility<Permissions>

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules: RequiredRule[] =
      this.reflector.get<RequiredRule[]>(
        CHECK_PERMISSIONS,
        context.getHandler(),
      ) || []
    const req = context.switchToHttp().getRequest()
    const payload: Payload = req.payload

    try {
      const role = payload.data.user.role
      const rolePermissions = PERMISSIONS_PER_ROLE[role]
      const actionsPermissions = rolePermissions[rules[0].subject]

      const action = rules[0].action

      if (
        actionsPermissions.includes(action) ||
        actionsPermissions.includes('*')
      ) {
        return true
      }
      throw new HttpException(
        'You do not have permission to perform this action',
        HttpStatus.FORBIDDEN,
      )
    } catch (error) {
      throw new HttpException(
        error?.message || 'You do not have permission to perform this action',
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
