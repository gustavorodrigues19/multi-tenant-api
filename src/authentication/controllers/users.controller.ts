import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common'
import UsersService from '../services/users.service'
import { CreateUserUseCaseInputDto } from '../dto/users-service.dto'
import { CreateUserValidationDto } from './validations/user.dto'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'
import { CheckPermissions } from '../decorators/permissions.decorator'
import { GlobalFiltersProps } from 'src/@shared/types/filters'

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CheckPermissions({ action: 'create', subject: 'administrators' })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreateUserValidationDto, @Req() req) {
    return this.usersService.createUserUseCase(
      input,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({ action: 'view', subject: 'administrators' })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(@Query() { take, skip }, @Req() req) {
    return this.usersService.findAllUsersUseCase(
      take,
      skip,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({
    action: 'view',
    subject: 'administrators',
  })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserUseCase(id)
  }

  @CheckPermissions({ action: 'edit', subject: 'administrators' })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() input: CreateUserUseCaseInputDto,
    @Req() req,
  ) {
    return this.usersService.updateUserUseCase(
      { id, ...input },
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({ action: 'delete', subject: 'administrators' })
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUserUseCase(id)
  }

  @CheckPermissions({ action: 'edit', subject: 'administrators' })
  @UseGuards(PermissionsGuard)
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivateUserUseCase(id)
  }
}
