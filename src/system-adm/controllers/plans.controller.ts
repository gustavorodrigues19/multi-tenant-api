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
import { ACTIONS, SCOPES } from 'src/@shared/types/permissions'

@Controller(SCOPES.PLANS)
export default class PlansController {
  constructor(private readonly planService: PlansService) {}

  @CheckPermissions({ action: ACTIONS.CREATE, subject: SCOPES.PLANS })
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.createPlanUseCase(input)
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.PLANS })
  @UseGuards(PermissionsGuard)
  @Get()
  findAll() {
    return this.planService.findAllPlansUseCase()
  }

  @CheckPermissions({ action: ACTIONS.VIEW, subject: SCOPES.PLANS })
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findPlanUseCase(id)
  }

  @CheckPermissions({ action: ACTIONS.EDIT, subject: SCOPES.PLANS })
  @UseGuards(PermissionsGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.updatePlanUseCase({ id, ...input })
  }
}
