import Franchise from '../../@shared/entities/franchise.entity'
import { FranchiseOutputDto } from '../dto/franchise-service.dto'

export default class FranchiseMapper {
  static toDomain(input: any): any {
    return {
      ...(input?.id && { id: input.id }),
      name: input.name,
      phone: input.phone,
      email: input.email,
      document: input.document,
      street: input.street,
      number: input.number,
      neighborhood: input.neighborhood,
      complement: input?.complement || null,
      zipCode: input.zipCode,
      city: input.city,
      state: input.state,
      country: input.country,
      isActive: input.isActive,
      tenant: {
        id: input.tenantId,
      },
    }
  }

  static toFranchiseOutputDto(franchise: Franchise): FranchiseOutputDto {
    return {
      id: franchise.id,
      name: franchise.name,
      phone: franchise.phone,
      email: franchise.email,
      document: franchise.document,
      street: franchise.street,
      number: franchise.number,
      neighborhood: franchise.neighborhood,
      ...(franchise?.complement && { complement: franchise.complement }),
      zipCode: franchise.zipCode,
      city: franchise.city,
      state: franchise.state,
      country: franchise.country,
      isActive: franchise.isActive,
    }
  }
}
