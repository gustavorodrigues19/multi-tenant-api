export interface CreatePlanUseCaseInputDto {
  name: string
  description: string
  price: number
}

export interface UpdatePlanUseCaseInputDto extends CreatePlanUseCaseInputDto {
  id: string
}

export interface PlanOutputDto {
  id: string
  name: string
  description: string
  price: number
}
