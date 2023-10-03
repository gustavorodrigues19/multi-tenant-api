import { Controller, Post, Body } from '@nestjs/common'
import AuthenticationService from '../services/authentication.service'
import { Public } from '../decorators/public.decorator'
import { LoginValidationDto } from './validations/login.dto'

@Controller('auth')
export default class AuthController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  login(@Body() input: LoginValidationDto) {
    return this.authenticationService.authenticateUseCase(input)
  }
}
