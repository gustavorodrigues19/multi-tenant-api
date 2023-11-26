import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import Tenant from '../../@shared/entities/tenant.entity'
import { User } from '../entities/user.entity'
import Franchise from '../../@shared/entities/franchise.entity'
import { isEmpty } from 'lodash'
import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { AdministratorsServiceGateway } from '../gateway/administrators.gateway'
import {
  AdministratorOutputDto,
  AdministratorOutputPaginatedDto,
  CreateAdministratorUseCaseInputDto,
  UpdateAdministratorUseCaseInputDto,
} from '../dto/administrators-service.dto'
import AdministratorMapper from '../mappers/administrators.mapper'
import { ERRORS } from 'src/common/errors-language'
import { LanguagesTypesKeys } from 'src/@shared/types/languages'

@Injectable()
export default class AdministratorsService
  implements AdministratorsServiceGateway
{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
  ) {}

  private async _verifyConditions(
    tenantId: string,
    franchisesIds: string[],
    language: LanguagesTypesKeys,
  ) {
    const tenant = await this.tenantRepository.findOneBy({ id: tenantId })
    if (!tenant) {
      throw new HttpException(
        ERRORS.TENANTS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    const franchises = await this.franchiseRepository.find({
      where: { id: In(franchisesIds || []) },
    })
    if (franchises.length !== franchisesIds.length) {
      throw new HttpException(
        ERRORS.FRANCHISES.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    return { tenant, franchises }
  }

  public async createAdministratorUseCase(
    input: CreateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto> {
    const { tenant, franchises } = await this._verifyConditions(
      filters.tenantId,
      filters.franchisesIds,
      language,
    )
    const user = await this.userRepository.save(
      AdministratorMapper.toDomain(input, franchises, tenant),
    )
    return AdministratorMapper.toAdministratorOutputDto(user)
  }

  public async findAllAdministratorsUseCase(
    pageSize: number,
    offset: number,
    filters: GlobalFiltersProps,
  ): Promise<AdministratorOutputPaginatedDto> {
    const [franchises, total] = await this.userRepository.findAndCount({
      take: pageSize,
      skip: offset,
      where: {
        ...(filters?.tenantId && { tenant: { id: filters.tenantId } }),
        ...(!isEmpty(filters.franchisesIds) && {
          franchises: { id: In(filters.franchisesIds) },
        }),
      },
    })
    const data = franchises.map(AdministratorMapper.toAdministratorOutputDto)

    return {
      data,
      offset,
      pageSize,
      total,
    }
  }

  public async findAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto> {
    console.log('language', language)
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException(
        ERRORS.ADMINISTRATORS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    return AdministratorMapper.toAdministratorOutputDto(user)
  }

  public async updateAdministratorUseCase(
    input: UpdateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto> {
    const { tenant, franchises } = await this._verifyConditions(
      filters.tenantId,
      filters.franchisesIds,
      language,
    )

    const updatedAdministrator = await this.userRepository.save(
      AdministratorMapper.toDomain(input, franchises, tenant),
    )
    return AdministratorMapper.toAdministratorOutputDto(updatedAdministrator)
  }

  public async deactivateAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException(
        ERRORS.ADMINISTRATORS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    const deactivatedAdministrator = await this.userRepository.save({
      ...user,
      isActive: false,
    })
    return AdministratorMapper.toAdministratorOutputDto(
      deactivatedAdministrator,
    )
  }

  public async removeAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException(
        ERRORS.ADMINISTRATORS.NOT_FOUND[language],
        HttpStatus.NOT_FOUND,
      )
    }

    await this.userRepository.delete({ id })
    return AdministratorMapper.toAdministratorOutputDto(user)
  }
}
