import {
  CreateFranchiseUseCaseInputDto,
  FranchiseOutputDto,
  FranchiseOutputPaginatedDto,
  UpdateFranchiseUseCaseInputDto,
} from '../dto/franchise-service.dto'

export interface FranchisesServiceGateway {
  createFranchiseUseCase(
    input: CreateFranchiseUseCaseInputDto,
  ): Promise<FranchiseOutputDto>
  findAllFranchisesUseCase(
    take: number,
    skip: number,
  ): Promise<FranchiseOutputPaginatedDto>
  findFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
  updateFranchiseUseCase(
    input: UpdateFranchiseUseCaseInputDto,
  ): Promise<FranchiseOutputDto>
  deactivateFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
  removeFranchiseUseCase(id: string): Promise<FranchiseOutputDto>
}
