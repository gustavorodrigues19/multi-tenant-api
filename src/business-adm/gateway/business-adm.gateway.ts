import { GlobalFiltersProps } from 'src/@shared/types/filters'
import {
  CreateFranchiseUseCaseInputDto,
  FranchiseOutputDto,
  FranchiseOutputPaginatedDto,
  UpdateFranchiseUseCaseInputDto,
} from '../dto/franchise-service.dto'

export interface FranchisesServiceGateway {
  createFranchiseUseCase(
    input: CreateFranchiseUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<FranchiseOutputDto>
  findAllFranchisesUseCase(
    take: number,
    skip: number,
    filters: GlobalFiltersProps,
  ): Promise<FranchiseOutputPaginatedDto>
  updateFranchiseUseCase(
    input: UpdateFranchiseUseCaseInputDto,
    filters: GlobalFiltersProps,
  ): Promise<FranchiseOutputDto>
  findFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
  deactivateFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
  removeFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
}
