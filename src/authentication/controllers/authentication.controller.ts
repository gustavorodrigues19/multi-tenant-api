import { Controller, Post, Body } from '@nestjs/common'
import { AuthenticationInputDto } from '../dto/authentication.service.dto'
import AuthenticationService from '../services/authentication.service'
import { Public } from '../decorators/public.decorator'

@Controller('auth')
export default class UsersController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  login(@Body() input: AuthenticationInputDto) {
    return this.authenticationService.authenticateUseCase(input)
  }
}
