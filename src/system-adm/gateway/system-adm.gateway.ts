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
  ): Promise<TenantOutputDto>
  findAllTenantsUseCase(): Promise<TenantOutputDto[]>
  findTenantUseCase(id: string): Promise<TenantOutputDto>
  updateTenantUseCase(
    input: UpdateTenantUseCaseInputDto,
  ): Promise<TenantOutputDto>
}

export interface PlansServiceGateway {
  createPlanUseCase(input: CreatePlanUseCaseInputDto): Promise<PlanOutputDto>
  findAllPlansUseCase(): Promise<PlanOutputDto[]>
  findPlanUseCase(id: string): Promise<PlanOutputDto>
  updatePlanUseCase(input: UpdatePlanUseCaseInputDto): Promise<PlanOutputDto>
}
