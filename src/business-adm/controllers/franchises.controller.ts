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
} from '@nestjs/common'
import FranchisesService from '../services/franchises.service'
import { FranchiseInputValidationDto } from './validations/franchises'
import { CheckPermissions } from 'src/authentication/decorators/permissions.decorator'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'

@Controller('franchises')
export default class FranchisesController {
  constructor(private readonly franchiseService: FranchisesService) {}

  @CheckPermissions({ action: 'create', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: FranchiseInputValidationDto) {
    return this.franchiseService.createFranchiseUseCase(input)
  }

  @CheckPermissions({ action: 'view', subject: 'franchises' })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(@Query() { take, skip }) {
    return this.franchiseService.findAllFranchisesUseCase(take, skip)
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
