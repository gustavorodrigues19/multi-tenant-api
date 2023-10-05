import { Reflector } from '@nestjs/core'

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import {
  CHECK_PERMISSIONS,
  RequiredRule,
} from 'src/authentication/decorators/permissions.decorator'
import { Payload } from 'src/@shared/types/payload'
import { PERMISSIONS_PER_ROLE } from './permissions'
import CaslService from './casl.service'
import {
  ACTIONS,
  ACTIONS_PERMS,
  ActionPermsKeys,
  ActionsKeys,
  SCOPES,
  ScopeKeys,
} from 'src/@shared/types/permissions'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly caslService: CaslService,
  ) {}

  private handleErrors(message?: string) {
    throw new HttpException(
      message || 'You do not have permission to perform this action',
      HttpStatus.FORBIDDEN,
    )
  }

  private isActionAllowed(routeAction: string, permission: string) {
    const [action] = permission.split(':')
    if (action === routeAction) return true
    return false
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const rules: RequiredRule[] =
        this.reflector.get<RequiredRule[]>(
          CHECK_PERMISSIONS,
          context.getHandler(),
        ) || []
      const request = context.switchToHttp().getRequest()
      const payload: Payload = request.payload

      const routeSubject = rules[0].subject
      const routeAction = rules[0].action

      const userRole = payload.data.user.role

      const rolePermissions = PERMISSIONS_PER_ROLE[userRole]
      const contextPermissionsList = rolePermissions[routeSubject]

      const action = contextPermissionsList.find(
        (permission) =>
          permission === '*:*' || this.isActionAllowed(routeAction, permission),
      )
      if (!action) this.handleErrors()

      const scopeAccess: ActionPermsKeys = action.split(':')[1]

      if (scopeAccess === ACTIONS_PERMS.RESTRICT) {
        switch (routeSubject) {
          case SCOPES.TENANTS:
            const tenantId = request.params?.id ?? request.body?.tenantId
            if (tenantId !== payload.data.tenant.id) this.handleErrors()
            break
          case SCOPES.FRANCHISES:
            const franchiseId = request.params?.id ?? request.body?.tenantId

            const isFranchiseAllowed = payload.data.franchises.some(
              (item) => item.id === franchiseId,
            )
            if (!isFranchiseAllowed) this.handleErrors()
            break
          case SCOPES.ADMINISTRATORS:
            const administratorId = request.params?.id ?? request.body?.userId
            if (administratorId !== payload.data.user.id) this.handleErrors()
            break
          default:
            this.handleErrors()
        }
      }
      this.caslService.populateFilters(request, payload)

      return true
    } catch (error) {
      this.handleErrors(error.message)
    }
  }
}
