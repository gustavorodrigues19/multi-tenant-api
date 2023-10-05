import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import TenantsService from '../services/tenants.service'
import { CreateTenantUseCaseInputDto } from '../dto/tenant-service.dto'
import { CheckPermissions } from 'src/authentication/decorators/permissions.decorator'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'
import { ACTIONS, SCOPES } from 'src/@shared/types/permissions'

@Controller(SCOPES.TENANTS)
export default class TenantsController {
  constructor(private readonly tenantService: TenantsService) {}

  @CheckPermissions({ action: ACTIONS.CREATE, subject: SCOPES.TENANTS })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreateTenantUseCaseInputDto) {
    return this.tenantService.createTenantUseCase(input)
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.TENANTS })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll() {
    return this.tenantService.findAllTenantsUseCase()
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.TENANTS })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findTenantUseCase(id)
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.TENANTS })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreateTenantUseCaseInputDto) {
    return this.tenantService.updateTenantUseCase({ id, ...input })
  }
}
