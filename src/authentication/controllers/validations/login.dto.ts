import { IsBase64, IsNotEmpty } from 'class-validator'

export class LoginValidationDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsBase64({ message: 'Wrong credentials' })
  password: string
}
