import { IsBase64, IsEmail, IsEnum, IsNotEmpty, IsUUID } from 'class-validator'

class BodyUserValidationDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsBase64()
  passwd: string

  @IsNotEmpty()
  @IsEnum(['pt-br', 'en-us', 'es-es'], {
    message: 'Invalid language',
  })
  language: string

  @IsNotEmpty()
  isActive: boolean
}

export class CreateUserValidationDto extends BodyUserValidationDto {
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  franchisesIds: string[]

  @IsEnum(['ORGANIZATION_ADMIN', 'FRANCHISE_ADMIN', 'CUSTOM_ADMIN'], {
    message: 'Invalid role',
  })
  role: string

  @IsNotEmpty()
  @IsUUID()
  tenantId: string
}

export class CreateUserMasterAdminValidationDto extends BodyUserValidationDto {
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  franchisesIds: string[]

  @IsEnum(['MASTER_ADMIN'], {
    message: 'Invalid role',
  })
  role: string

  @IsUUID('4')
  tenantId: string
}
