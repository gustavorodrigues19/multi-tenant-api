import { LanguagesTypesKeys } from 'src/@shared/types/languages'
import {
  CreatePlanUseCaseInputDto,
  PlanOutputDto,
  UpdatePlanUseCaseInputDto,
} from '../dto/plan-service.dto'
import {
  CreateTenantUseCaseInputDto,
  TenantOutputDto,
  UpdateTenantUseCaseInputDto,
} from '../dto/tenant-service.dto'

export interface TenantsServiceGateway {
  createTenantUseCase(
    input: CreateTenantUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto>
  findAllTenantsUseCase(): Promise<TenantOutputDto[]>
  findTenantUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto>
  updateTenantUseCase(
    input: UpdateTenantUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<TenantOutputDto>
}

export interface PlansServiceGateway {
  createPlanUseCase(input: CreatePlanUseCaseInputDto): Promise<PlanOutputDto>
  findAllPlansUseCase(): Promise<PlanOutputDto[]>
  findPlanUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<PlanOutputDto>
  updatePlanUseCase(
    input: UpdatePlanUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<PlanOutputDto>
}
