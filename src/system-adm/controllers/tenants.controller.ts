import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
import TenantsService from '../services/tenants.service'
import { CreateTenantUseCaseInputDto } from '../dto/tenant-service.dto'

@Controller('tenants')
export default class TenantsController {
  constructor(private readonly tenantService: TenantsService) {}

  @Post()
  create(@Body() input: CreateTenantUseCaseInputDto) {
    return this.tenantService.createTenantUseCase(input)
  }

  @Get()
  findAll() {
    return this.tenantService.findAllTenantsUseCase()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findTenantUseCase(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreateTenantUseCaseInputDto) {
    return this.tenantService.updateTenantUseCase({ id, ...input })
  }
}
