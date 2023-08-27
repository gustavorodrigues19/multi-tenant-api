import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import UsersService from '../services/users.service'
import { CreateUserUseCaseInputDto } from '../dto/users-service.dto'

@Controller('users')
export default class UsersController {
  constructor(private readonly franchiseService: UsersService) {}

  @Post()
  create(@Body() input: CreateUserUseCaseInputDto) {
    return this.franchiseService.createUserUseCase(input)
  }

  @Get()
  findAll(@Query() { take, skip }) {
    return this.franchiseService.findAllUsersUseCase(take, skip)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchiseService.findUserUseCase(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreateUserUseCaseInputDto) {
    return this.franchiseService.updateUserUseCase({ id, ...input })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchiseService.removeUserUseCase(id)
  }

  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.franchiseService.deactivateUserUseCase(id)
  }
}
