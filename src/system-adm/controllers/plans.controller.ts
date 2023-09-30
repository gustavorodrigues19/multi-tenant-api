import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import PlansService from '../services/plans.service'
import { CreatePlanUseCaseInputDto } from '../dto/plan-service.dto'
import { CheckPermissions } from 'src/authentication/decorators/permissions.decorator'
import { PermissionsGuard } from 'src/casl/casl-permissions.factory'

@Controller('plans')
export default class PlansController {
  constructor(private readonly planService: PlansService) {}

  @CheckPermissions({ action: 'create', subject: 'plans' })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.createPlanUseCase(input)
  }

  @CheckPermissions({ action: 'view', subject: 'plans' })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll() {
    return this.planService.findAllPlansUseCase()
  }

  @CheckPermissions({ action: 'view', subject: 'plans' })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findPlanUseCase(id)
  }

  @CheckPermissions({ action: 'edit', subject: 'plans' })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.updatePlanUseCase({ id, ...input })
  }
}
