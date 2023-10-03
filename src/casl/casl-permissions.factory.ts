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

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly caslService: CaslService,
  ) {}

  handleErrors(message?: string) {
    throw new HttpException(
      message || 'You do not have permission to perform this action',
      HttpStatus.FORBIDDEN,
    )
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules: RequiredRule[] =
      this.reflector.get<RequiredRule[]>(
        CHECK_PERMISSIONS,
        context.getHandler(),
      ) || []
    const request = context.switchToHttp().getRequest()
    const payload: Payload = request.payload

    try {
      const routeSubject = rules[0].subject
      const routeAction = rules[0].action
      const userRole = payload.data.user.role

      const rolePermissions = PERMISSIONS_PER_ROLE[userRole]
      const [actions, restrictions] = rolePermissions[routeSubject].split(':')

      this.caslService.populateFilters(request, payload)

      if (actions.includes('*') && restrictions.includes('*')) return true

      this.handleErrors()
    } catch (error) {
      this.handleErrors(error.message)
    }
  }
}
