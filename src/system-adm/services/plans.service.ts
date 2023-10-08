import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PlansServiceGateway } from '../gateway/system-adm.gateway'
import Plan from '../../@shared/entities/plan.entity'
import PlanMapper from '../mappers/plans.mapper'
import {
  CreatePlanUseCaseInputDto,
  PlanOutputDto,
  UpdatePlanUseCaseInputDto,
} from '../dto/plan-service.dto'
import { ERRORS } from 'src/common/errors-language'
import { LanguagesTypesKeys } from 'src/@shared/types/languages'

@Injectable()
export default class PlansService implements PlansServiceGateway {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  public async createPlanUseCase(
    input: CreatePlanUseCaseInputDto,
  ): Promise<PlanOutputDto> {
    const plan = await this.planRepository.save(input)
    return PlanMapper.toPlanOutputDto(plan)
  }

  public async findAllPlansUseCase(): Promise<PlanOutputDto[]> {
    const plans = await this.planRepository.find()
    return plans.map(PlanMapper.toPlanOutputDto)
  }

  public async findPlanUseCase(
    id: string,
    language: LanguagesTypesKeys,
  ): Promise<PlanOutputDto> {
    const plan = await this.planRepository.findOneBy({ id })
    if (!plan)
      throw new HttpException(ERRORS.PLANS[language], HttpStatus.NOT_FOUND)

    return PlanMapper.toPlanOutputDto(plan)
  }

  public async updatePlanUseCase(
    input: UpdatePlanUseCaseInputDto,
    language: LanguagesTypesKeys,
  ): Promise<PlanOutputDto> {
    const plan = await this.planRepository.findOneBy({ id: input.id })
    if (!plan)
      throw new HttpException(ERRORS.PLANS[language], HttpStatus.NOT_FOUND)

    const updatedPlan = await this.planRepository.save(input)
    return PlanMapper.toPlanOutputDto(updatedPlan)
  }
}
