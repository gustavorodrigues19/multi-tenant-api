import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import FranchisesService from '../services/franchises.service'
import { Public } from 'src/authentication/decorators/public.decorator'
import { FranchiseInputValidationDto } from './validations/franchises'

@Controller('franchises')
export default class FranchisesController {
  constructor(private readonly franchiseService: FranchisesService) {}

  @Public()
  @Post()
  create(@Body() input: FranchiseInputValidationDto) {
    return this.franchiseService.createFranchiseUseCase(input)
  }

  @Get()
  findAll(@Query() { take, skip }) {
    return this.franchiseService.findAllFranchisesUseCase(take, skip)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.franchiseService.findFranchiseUseCase(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: FranchiseInputValidationDto) {
    return this.franchiseService.updateFranchiseUseCase({ id, ...input })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.franchiseService.removeFranchiseUseCase(id)
  }

  @Put(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.franchiseService.deactivateFranchiseUseCase(id)
  }
}
