import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import {
  AdministratorOutputDto,
  AdministratorOutputPaginatedDto,
  CreateAdministratorUseCaseInputDto,
  UpdateAdministratorUseCaseInputDto,
} from '../dto/administrators-service.dto'
import { LanguagesTypesKeys } from 'src/@shared/types/languages'

export interface AdministratorsServiceGateway {
  createAdministratorUseCase(
    input: CreateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto>
  findAllAdministratorsUseCase(
    take: number,
    skip: number,
    filters: GlobalFiltersProps,
  ): Promise<AdministratorOutputPaginatedDto>
  updateAdministratorUseCase(
    input: UpdateAdministratorUseCaseInputDto,
    filters: GlobalFiltersProps,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto>
  findAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto>
  deactivateAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto>
  removeAdministratorUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<AdministratorOutputDto>
}

export interface AuthenticationServiceGateway {
  authenticateUseCase(
    input: AuthenticationInputDto,
  ): Promise<{ accessToken: string }>
}
