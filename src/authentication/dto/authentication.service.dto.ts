export interface AuthenticationInputDto {
  username: string
  password: string
}

export interface SystemResourcesProps {
  system: string[]
  business: string[]
  academy: string[]
  financial: string[]
  technical: string[]
}
