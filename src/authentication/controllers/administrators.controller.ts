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
import { LanguagesTypesKeys } from 'src/@shared/types/languages'
import { getPageSizeAndOffset } from 'src/utils/convert'

@Controller(SCOPES.ADMINISTRATORS)
export default class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @CheckPermissions({ action: ACTIONS.CREATE, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreateAdministratorValidationDto, @Req() req) {
    return this.administratorsService.createAdministratorUseCase(
      input,
      req.filters as GlobalFiltersProps,
      req.language as LanguagesTypesKeys,
    )
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(
    @Query() { pageSize, offset }: { pageSize: string; offset: string },
    @Req() req,
  ) {
    const { parsedPageSize, parsedOffset } = getPageSizeAndOffset(
      pageSize,
      offset,
    )
    return this.administratorsService.findAllAdministratorsUseCase(
      parsedPageSize,
      parsedOffset,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({
    action: ACTIONS.VIEW,
    subject: SCOPES.ADMINISTRATORS,
  })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.administratorsService.findAdministratorUseCase(
      id,
      req.language as LanguagesTypesKeys,
    )
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() input: CreateAdministratorUseCaseInputDto,
    @Req() req,
  ) {
    return this.administratorsService.updateAdministratorUseCase(
      { id, ...input },
      req.filters as GlobalFiltersProps,
      req.language as LanguagesTypesKeys,
    )
  }

  @CheckPermissions({ action: ACTIONS.DELETE, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.administratorsService.removeAdministratorUseCase(
      id,
      req.language as LanguagesTypesKeys,
    )
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.ADMINISTRATORS })
  @UseGuards(PermissionsGuard)
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string, @Req() req) {
    return this.administratorsService.deactivateAdministratorUseCase(
      id,
      req.language as LanguagesTypesKeys,
    )
  }
}
