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
import AdministratorsService from '../services/administrators.service'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'
import { CheckPermissions } from '../decorators/permissions.decorator'
import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { ACTIONS, SCOPES } from 'src/@shared/types/permissions'
import { CreateAdministratorUseCaseInputDto } from '../dto/administrators-service.dto'
import { CreateAdministratorValidationDto } from './validations/administrator.dto'

@Controller(SCOPES.ADMINISTRATORS)
export default class AdministratorsController {
  constructor(private readonly usersService: AdministratorsService) {}

  @CheckPermissions({ action: ACTIONS.CREATE, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreateAdministratorValidationDto, @Req() req) {
    return this.usersService.createAdministratorUseCase(
      input,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(@Query() { take, skip }, @Req() req) {
    return this.usersService.findAllAdministratorsUseCase(
      take,
      skip,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({
    action: ACTIONS.VIEW,
    subject: SCOPES.ADMINISTRATORS,
  })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findAdministratorUseCase(id)
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() input: CreateAdministratorUseCaseInputDto,
    @Req() req,
  ) {
    return this.usersService.updateAdministratorUseCase(
      { id, ...input },
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({ action: ACTIONS.DELETE, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeAdministratorUseCase(id)
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivateAdministratorUseCase(id)
  }
}
