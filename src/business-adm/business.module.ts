import { Module } from '@nestjs/common'
import FranchisesService from './services/franchises.service'
import FranchisesController from './controllers/franchises.controller'
import Tenant from '../@shared/entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from '../@shared/entities/franchise.entity'
import CaslService from 'src/casl/casl.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Franchise])],
  controllers: [FranchisesController],
  providers: [FranchisesService, CaslService],
})
export class BusinessAdmModule {}
