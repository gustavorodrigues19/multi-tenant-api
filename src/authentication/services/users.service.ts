import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { UsersServiceGateway } from '../gateway/authentication-adm.gateway'
import Tenant from '../../@shared/entities/tenant.entity'
import UserMapper from '../mappers/users.mapper'
import {
  CreateUserUseCaseInputDto,
  UpdateUserUseCaseInputDto,
  UserOutputDto,
  UserOutputPaginatedDto,
} from '../dto/users-service.dto'
import { User } from '../entities/user.entity'
import Franchise from '../../@shared/entities/franchise.entity'

@Injectable()
export default class UsersService implements UsersServiceGateway {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Franchise)
    private franchiseRepository: Repository<Franchise>,
  ) {}

  private async _verifyConditions(tenantId: string, franchisesIds: string[]) {
    const tenant = await this.tenantRepository.findOneBy({ id: tenantId })
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND)
    }

    const franchises = await this.franchiseRepository.find({
      where: { id: In(franchisesIds) },
    })
    if (franchises.length !== franchisesIds.length) {
      throw new HttpException('Franchises not found', HttpStatus.NOT_FOUND)
    }

    return { tenant, franchises }
  }

  public async createUserUseCase(
    input: CreateUserUseCaseInputDto,
  ): Promise<UserOutputDto> {
    const { tenant, franchises } = await this._verifyConditions(
      input.tenantId,
      input.franchisesIds,
    )
    const user = await this.userRepository.save(
      UserMapper.toDomain(input, franchises, tenant),
    )
    return UserMapper.toUserOutputDto(user)
  }

  public async findAllUsersUseCase(
    take: number,
    skip: number,
  ): Promise<UserOutputPaginatedDto> {
    const [franchises, total] = await this.userRepository.findAndCount({
      take,
      skip,
    })
    const data = franchises.map(UserMapper.toUserOutputDto)

    return {
      data,
      total,
    }
  }

  public async findUserUseCase(id: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return UserMapper.toUserOutputDto(user)
  }

  public async updateUserUseCase(
    input: UpdateUserUseCaseInputDto,
  ): Promise<UserOutputDto> {
    const { tenant, franchises } = await this._verifyConditions(
      input.tenantId,
      input.franchisesIds,
    )

    const updatedUser = await this.userRepository.save(
      UserMapper.toDomain(input, franchises, tenant),
    )
    return UserMapper.toUserOutputDto(updatedUser)
  }

  public async deactivateUserUseCase(id: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const deactivatedUser = await this.userRepository.save({
      ...user,
      isActive: false,
    })
    return UserMapper.toUserOutputDto(deactivatedUser)
  }

  public async removeUserUseCase(id: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    await this.userRepository.delete({ id })
    return UserMapper.toUserOutputDto(user)
  }
}
