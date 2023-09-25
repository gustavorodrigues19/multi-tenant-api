import { IsBase64, IsNotEmpty } from 'class-validator'

export class LoginValidationDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsBase64()
  password: string
}
