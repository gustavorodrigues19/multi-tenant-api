import { Module } from '@nestjs/common'
import FranchisesService from './services/franchises.service'
import FranchisesController from './controllers/franchises.controller'
import Tenant from '../@shared/entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from '../@shared/entities/franchise.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Franchise])],
  controllers: [FranchisesController],
  providers: [FranchisesService],
})
export class BusinessAdmModule {}
