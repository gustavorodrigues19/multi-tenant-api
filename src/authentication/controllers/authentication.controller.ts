import { Controller, Post, Body } from '@nestjs/common'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import AuthenticationService from '../services/authentication.service'

@Controller('auth')
export default class UsersController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() input: AuthenticationInputDto) {
    return this.authenticationService.authenticateUseCase(input)
  }
}
