import { IsNotEmpty } from 'class-validator'

export class LoginValidationDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
