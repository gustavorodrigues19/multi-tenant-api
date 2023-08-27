import {
  CreateUserUseCaseInputDto,
  UserOutputDto,
  UserOutputPaginatedDto,
  UpdateUserUseCaseInputDto,
} from '../dto/users-service.dto'

export interface UsersServiceGateway {
  createUserUseCase(input: CreateUserUseCaseInputDto): Promise<UserOutputDto>
  findAllUsersUseCase(
    take: number,
    skip: number,
  ): Promise<UserOutputPaginatedDto>
  findUserUseCase(id: string): Promise<UserOutputDto>
  updateUserUseCase(input: UpdateUserUseCaseInputDto): Promise<UserOutputDto>
  deactivateUserUseCase(id: string): Promise<UserOutputDto>
  removeUserUseCase(id: string): Promise<UserOutputDto>
}
