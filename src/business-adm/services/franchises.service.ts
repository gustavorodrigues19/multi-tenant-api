import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FranchisesServiceGateway } from '../gateway/business-adm.gateway'
import Tenant from '../../@shared/entities/tenant.entity'
import {
  CreateFranchiseUseCaseInputDto,
  FranchiseOutputDto,
  FranchiseOutputPaginatedDto,
  UpdateFranchiseUseCaseInputDto,
} from '../dto/franchise-service.dto'
import Franchise from '../../@shared/entities/franchise.entity'
import FranchiseMapper from '../mappers/franchises.mapper'
import { GlobalFiltersProps } from 'src/@shared/types/filters'

@Injectable()
export default class FranchisesService implements FranchisesServiceGateway {
  constructor(
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  public async createFranchiseUseCase(
    input: CreateFranchiseUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<FranchiseOutputDto> {
    const tenant = await this.tenantRepository.findOneBy({
      id: filters.tenantId,
    })
    if (!tenant)
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND)

    const franchiseName = await this.franchiseRepository.findOneBy({
      name: input.name,
      tenant: {
        id: filters.tenantId,
      },
    })
    if (franchiseName) {
      throw new HttpException(
        'Franchise name already exists',
        HttpStatus.CONFLICT,
      )
    }

    const franchise = await this.franchiseRepository.save(
      FranchiseMapper.toDomain(input, filters.tenantId),
    )
    return FranchiseMapper.toFranchiseOutputDto(franchise)
  }

  public async findAllFranchisesUseCase(
    pageSize: number,
    offset: number,
  ): Promise<FranchiseOutputPaginatedDto> {
    const [franchises, total] = await this.franchiseRepository.findAndCount({
      take: pageSize,
      skip: offset,
    })
    const data = franchises.map(FranchiseMapper.toFranchiseOutputDto)

    return {
      data,
      offset,
      pageSize,
      total,
    }
  }

  public async findFranchiseUseCase(id: string): Promise<FranchiseOutputDto> {
    const franchise = await this.franchiseRepository.findOneBy({ id })
    if (!franchise) {
      throw new HttpException('Franchise not found', HttpStatus.NOT_FOUND)
    }

    return FranchiseMapper.toFranchiseOutputDto(franchise)
  }

  public async updateFranchiseUseCase(
    input: UpdateFranchiseUseCaseInputDto,
  ): Promise<FranchiseOutputDto> {
    const franchise = await this.franchiseRepository.findOneBy({ id: input.id })
    if (!franchise) {
      throw new HttpException('Franchise not found', HttpStatus.NOT_FOUND)
    }

    const tenant = await this.tenantRepository.findOneBy({ id: input.id })
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND)
    }

    const updatedFranchise = await this.franchiseRepository.save(franchise)
    return FranchiseMapper.toFranchiseOutputDto(updatedFranchise)
  }

  public async deactivateFranchiseUseCase(
    id: string,
  ): Promise<FranchiseOutputDto> {
    const franchise = await this.franchiseRepository.findOneBy({ id })
    if (!franchise) {
      throw new HttpException('Franchise not found', HttpStatus.NOT_FOUND)
    }

    const deactivatedFranchise = await this.franchiseRepository.save({
      ...franchise,
      isActive: false,
    })
    return FranchiseMapper.toFranchiseOutputDto(deactivatedFranchise)
  }

  public async removeFranchiseUseCase(id: string): Promise<FranchiseOutputDto> {
    const franchise = await this.franchiseRepository.findOneBy({ id })
    if (!franchise) {
      throw new HttpException('Franchise not found', HttpStatus.NOT_FOUND)
    }

    await this.franchiseRepository.delete({ id })
    return FranchiseMapper.toFranchiseOutputDto(franchise)
  }
}
