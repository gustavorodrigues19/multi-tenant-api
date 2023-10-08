import { HttpException, HttpStatus } from '@nestjs/common'
import { Payload } from 'src/@shared/types/payload'
import { ROLES } from 'src/@shared/types/permissions'
export default class CaslService {
  public populateFilters(request: any, payload: Payload) {
    const { tenant, franchises, user } = payload.data

    let tenantId: string | undefined = tenant.id
    let franchisesIds: string[] = franchises.map((item) => item.id)

    if (user.role === ROLES.MASTER_ADMIN) {
      tenantId = request.body?.tenantId ?? undefined
      franchisesIds = request.body?.franchisesIds ?? []
    } else {
      if (request.body?.tenantId) {
        throw new HttpException(
          'Field tenantId is not valid',
          HttpStatus.BAD_REQUEST,
        )
      }

      const bodyFranchisesIds = request.body?.franchisesIds ?? []
      if (bodyFranchisesIds.length > 0) {
        const isValidFranchises = bodyFranchisesIds.every((item) =>
          franchisesIds.includes(item),
        )
        if (isValidFranchises) {
          franchisesIds = bodyFranchisesIds
        } else {
          throw new HttpException(
            'You do not have permission to perform this action',
            HttpStatus.FORBIDDEN,
          )
        }
      }
    }

    request['filters'] = {
      tenantId,
      franchisesIds,
    }
  }

  public populateLanguage(request: any, payload: Payload) {
    request['language'] = payload.data.user.language
  }
}
