import { Reflector } from '@nestjs/core'

import {
  RawRuleOf,
  ForcedSubject,
  ForbiddenError,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import {
  CHECK_PERMISSIONS,
  RequiredRule,
} from 'src/authentication/decorators/permissions.decorator'

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
    const rules: any =
      this.reflector.get<RequiredRule[]>(
        CHECK_PERMISSIONS,
        context.getHandler(),
      ) || []
    const permissions = context.switchToHttp().getRequest()

    try {
      console.log('passou aqui', rules)

      return true
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message)
      }
      throw error
    }
  }
}
