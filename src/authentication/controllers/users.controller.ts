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
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() input: CreateUserUseCaseInputDto) {
    return this.usersService.createUserUseCase(input)
  }

  @Get()
  findAll(@Query() { take, skip }) {
    return this.usersService.findAllUsersUseCase(take, skip)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserUseCase(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreateUserUseCaseInputDto) {
    return this.usersService.updateUserUseCase({ id, ...input })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUserUseCase(id)
  }

  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivateUserUseCase(id)
  }
}
