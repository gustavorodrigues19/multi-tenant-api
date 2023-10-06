export interface CreateFranchiseUseCaseInputDto {
  name: string
  email: string
  phone: string
  document: string
  street: string
  number: string
  neighborhood: string
  complement?: string
  zipCode: string
  city: string
  state: string
  country: string
  isActive: boolean
}

export interface UpdateFranchiseUseCaseInputDto
  extends CreateFranchiseUseCaseInputDto {
  id: string
}

export interface FranchiseOutputDto {
  id: string
  name: string
  email: string
  phone: string
  document: string
  street: string
  number: string
  neighborhood: string
  complement?: string
  zipCode: string
  city: string
  state: string
  country: string
  isActive: boolean
}

export interface FranchiseOutputPaginatedDto {
  data: FranchiseOutputDto[]
  total: number
}
