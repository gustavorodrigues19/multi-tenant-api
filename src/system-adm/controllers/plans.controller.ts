import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
import PlansService from '../services/plans.service'
import { CreatePlanUseCaseInputDto } from '../dto/plan-service.dto'

@Controller('plans')
export default class PlansController {
  constructor(private readonly planService: PlansService) {}

  @Post()
  create(@Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.createPlanUseCase(input)
  }

  @Get()
  findAll() {
    return this.planService.findAllPlansUseCase()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findPlanUseCase(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: CreatePlanUseCaseInputDto) {
    return this.planService.updatePlanUseCase({ id, ...input })
  }
}
