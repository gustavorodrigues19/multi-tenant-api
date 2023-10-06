import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import {
  AdministratorOutputDto,
  AdministratorOutputPaginatedDto,
  CreateAdministratorUseCaseInputDto,
  UpdateAdministratorUseCaseInputDto,
} from '../dto/administrators-service.dto'

export interface AdministratorsServiceGateway {
  createAdministratorUseCase(
    input: CreateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<AdministratorOutputDto>
  findAllAdministratorsUseCase(
    take: number,
    skip: number,
    filters: GlobalFiltersProps,
  ): Promise<AdministratorOutputPaginatedDto>
  updateAdministratorUseCase(
    input: UpdateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<AdministratorOutputDto>
  findAdministratorUseCase(id: string): Promise<AdministratorOutputDto>
  deactivateAdministratorUseCase(id: string): Promise<AdministratorOutputDto>
  removeAdministratorUseCase(id: string): Promise<AdministratorOutputDto>
}

export interface AuthenticationServiceGateway {
  authenticateUseCase(
    input: AuthenticationInputDto,
  ): Promise<{ accessToken: string }>
}
