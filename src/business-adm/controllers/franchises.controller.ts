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
import FranchisesService from '../services/franchises.service'
import { FranchiseInputValidationDto } from './validations/franchises'
import { CheckPermissions } from 'src/authentication/decorators/permissions.decorator'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'
import { GlobalFiltersProps } from 'src/@shared/types/filters'
import { getPageSizeAndOffset } from 'src/utils/convert'

@Controller('franchises')
export default class FranchisesController {
  constructor(private readonly franchiseService: FranchisesService) {}

  @CheckPermissions({ action: 'create', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: FranchiseInputValidationDto, @Req() req) {
    return this.franchiseService.createFranchiseUseCase(
      input,
      req.filters as GlobalFiltersProps,
    )
  }

  @CheckPermissions({ action: 'view', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(@Query() { pageSize, offset }: { pageSize: string; offset: string }) {
    const { parsedPageSize, parsedOffset } = getPageSizeAndOffset(
      pageSize,
      offset,
    )
    return this.franchiseService.findAllFranchisesUseCase(
      parsedPageSize,
      parsedOffset,
    )
  }

  @CheckPermissions({ action: 'view', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchiseService.findFranchiseUseCase(id)
  }

  @CheckPermissions({ action: 'edit', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() input: FranchiseInputValidationDto) {
    return this.franchiseService.updateFranchiseUseCase({ id, ...input })
  }

  @CheckPermissions({ action: 'delete', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchiseService.removeFranchiseUseCase(id)
  }

  @CheckPermissions({ action: 'edit', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.franchiseService.deactivateFranchiseUseCase(id)
  }
}
