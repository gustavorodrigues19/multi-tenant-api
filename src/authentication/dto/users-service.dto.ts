export interface CreateUserUseCaseInputDto {
  username: string
  email: string
  passwd: string
  role: string
  language: string
  isActive: boolean
  tenantId: string
  franchisesIds: string[]
}

export interface UpdateUserUseCaseInputDto extends CreateUserUseCaseInputDto {
  id: string
}

export interface UserOutputDto {
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

export interface UserOutputPaginatedDto {
  data: UserOutputDto[]
  total: number
}
