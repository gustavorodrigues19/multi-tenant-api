import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator'

export class FranchiseInputValidationDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string

  @IsNotEmpty()
  document: string

  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  @IsString()
  number: string

  @IsNotEmpty()
  neighborhood: string

  @IsString()
  complement: string | undefined

  @IsPostalCode('BR')
  zipCode: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  country: string

  @IsNotEmpty()
  isActive: boolean

  @IsNotEmpty()
  @IsUUID()
  tenantId: string
}
