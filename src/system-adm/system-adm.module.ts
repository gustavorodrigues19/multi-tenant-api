import { Module } from '@nestjs/common'
import TenantsService from './services/tenants.service'
import TenantsController from './controllers/tenants.controller'
import Tenant from '../@shared/entities/tenant.entity'
import Plan from '../@shared/entities/plan.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import PlansController from './controllers/plans.controller'
import PlansService from './services/plans.service'
import CaslService from 'src/casl/casl.service'
import Franchise from 'src/@shared/entities/franchise.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Plan, Franchise])],
  controllers: [TenantsController, PlansController],
  providers: [TenantsService, PlansService, CaslService],
})
export class SystemAdmModule {}
