import { IsEmail, IsEnum, IsNotEmpty, IsUUID, isEnum } from 'class-validator'

export class CreateUserValidationDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  passwd: string

  @IsNotEmpty()
  @IsEnum(['pt-br', 'en-us', 'es-es'], {
    message: 'Invalid language',
  })
  language: string

  @IsNotEmpty()
  isActive: boolean

  @IsEnum(['ORGANIZATION_ADMIN', 'FRANCHISE_ADMIN', 'CUSTOM_ADMIN'], {
    message: 'Invalid role',
  })
  role: string

  @IsNotEmpty()
  @IsUUID()
  tenantId: string

  @IsNotEmpty()
  @IsUUID('4', { each: true })
  franchisesIds: string[]
}
