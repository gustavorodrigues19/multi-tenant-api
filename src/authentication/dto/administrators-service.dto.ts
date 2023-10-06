export interface CreateAdministratorUseCaseInputDto {
  username: string
  email: string
  passwd: string
  role: string
  language: string
  isActive: boolean
  tenantId: string
  franchisesIds: string[]
}

export interface UpdateAdministratorUseCaseInputDto
  extends CreateAdministratorUseCaseInputDto {
  id: string
}

export interface AdministratorOutputDto {
  id: string
  username: string
  email: string
  language: string
  isActive: boolean
  franchises: {
    id: string
    name: string
  }[]
}

export interface AdministratorOutputPaginatedDto {
  data: AdministratorOutputDto[]
  total: number
}
