import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import Tenant from '../../@shared/entities/tenant.entity'
import { Repository } from 'typeorm'
import Plan from '../../@shared/entities/plan.entity'
import {
  CreateTenantUseCaseInputDto,
  TenantOutputDto,
  UpdateTenantUseCaseInputDto,
} from '../dto/tenant-service.dto'
import TenantMapper from '../mappers/tenants.mapper'
import { TenantsServiceGateway } from '../gateway/system-adm.gateway'
import { ERRORS } from 'src/common/errors-language'
import { LanguagesTypesKeys } from 'src/@shared/types/languages'

@Injectable()
export default class TenantsService implements TenantsServiceGateway {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  public async createTenantUseCase(
    input: CreateTenantUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto> {
    const plan = await this.planRepository.findOneBy({ id: input.planId })
    if (!plan)
      throw new HttpException(
        ERRORS.PLANS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )

    const tenant = await this.tenantRepository.save(
      TenantMapper.toDomain(input),
    )
    return TenantMapper.toTenantOutputDto(tenant)
  }

  public async findAllTenantsUseCase(): Promise<TenantOutputDto[]> {
    const tenants = await this.tenantRepository.find()
    return tenants.map(TenantMapper.toTenantOutputDto)
  }

  public async findTenantUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto> {
    const tenant = await this.tenantRepository.findOneBy({ id })
    if (!tenant) {
      throw new HttpException(
        ERRORS.TENANTS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    return TenantMapper.toTenantOutputDto(tenant)
  }

  public async updateTenantUseCase(
    input: UpdateTenantUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto> {
    const tenant = await this.tenantRepository.findOneBy({ id: input.id })
    if (!tenant) {
      throw new HttpException(
        ERRORS.TENANTS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    const plan = await this.planRepository.findOneBy({ id: input.planId })
    if (!plan)
      throw new HttpException(
        ERRORS.PLANS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )

    const updatedTenant = await this.tenantRepository.save(tenant)
    return TenantMapper.toTenantOutputDto(updatedTenant)
  }
}
