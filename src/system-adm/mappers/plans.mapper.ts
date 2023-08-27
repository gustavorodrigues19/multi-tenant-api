import Plan from 'src/@shared/entities/plan.entity'
import {
  CreatePlanUseCaseInputDto,
  PlanOutputDto,
  UpdatePlanUseCaseInputDto,
} from '../dto/plan-service.dto'

export default class PlanMapper {
  static toDomain(
    input: CreatePlanUseCaseInputDto & UpdatePlanUseCaseInputDto,
  ): any {
    return {
      ...(input?.id && { id: input.id }),
      name: input.name,
      description: input.description,
      price: input.price,
    }
  }

  static toPlanOutputDto(plan: Plan): PlanOutputDto {
    return {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
    }
  }
}
