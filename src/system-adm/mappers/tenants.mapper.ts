import Tenant from '../../@shared/entities/tenant.entity'
import {
  CreateTenantUseCaseInputDto,
  TenantOutputDto,
  UpdateTenantUseCaseInputDto,
} from '../dto/tenant-service.dto'

export default class TenantMapper {
  static toDomain(input: any): any {
    return {
      ...(input?.id && { id: input.id }),
      name: input.name,
      document: input.document,
      domain: input.domain,
      isActive: input.isActive,
      plan: {
        id: input.planId,
      },
    }
  }

  static toTenantOutputDto(tenant: Tenant): TenantOutputDto {
    return {
      id: tenant.id,
      name: tenant.name,
      document: tenant.document,
      domain: tenant.domain,
      plan: {
        id: tenant.plan.id,
        name: tenant.plan.name,
        price: tenant.plan.price,
      },
      isActive: tenant.isActive,
    }
  }
}
