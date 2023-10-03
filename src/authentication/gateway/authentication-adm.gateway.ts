import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import {
  CreateUserUseCaseInputDto,
  UserOutputDto,
  UserOutputPaginatedDto,
  UpdateUserUseCaseInputDto,
} from '../dto/users-service.dto'

export interface UsersServiceGateway {
  createUserUseCase(
    input: CreateUserUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<UserOutputDto>
  findAllUsersUseCase(
    take: number,
    skip: number,
    filters: GlobalFiltersProps,
  ): Promise<UserOutputPaginatedDto>
  updateUserUseCase(
    input: UpdateUserUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<UserOutputDto>
  findUserUseCase(id: string): Promise<UserOutputDto>
  deactivateUserUseCase(id: string): Promise<UserOutputDto>
  removeUserUseCase(id: string): Promise<UserOutputDto>
}

export interface AuthenticationServiceGateway {
  authenticateUseCase(
    input: AuthenticationInputDto,
  ): Promise<{ accessToken: string }>
}
