export interface CreateTenantUseCaseInputDto {
  name: string
  document: string
  domain: string
  planId: string
  isActive: boolean
}

export interface UpdateTenantUseCaseInputDto
  extends CreateTenantUseCaseInputDto {
  id: string
}

export interface TenantOutputDto {
  id: string
  name: string
  document: string
  domain: string
  plan: {
    id: string
    name: string
    price: number
  }
  isActive: boolean
}
