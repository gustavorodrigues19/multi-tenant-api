import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Franchise from 'src/@shared/entities/franchise.entity'
import { Payload } from 'src/@shared/types/payload'
import { ROLES } from 'src/@shared/types/roles'
import { Repository } from 'typeorm'

export default class CaslService {
  constructor(
    @InjectRepository(Franchise)
    private tenantRepository: Repository<Franchise>,
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
  ) {}

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

  public async getTenant(id: string): Promise<Franchise> {
    const tenant = await this.tenantRepository.findOneBy({ id })

    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND)
    }

    return tenant
  }

  public async getFranchise(id: string): Promise<Franchise> {
    const franchise = await this.franchiseRepository.findOneBy({ id })

    if (!franchise) {
      throw new HttpException('Franchise not found', HttpStatus.NOT_FOUND)
    }

    return franchise
  }
}
