import { Module } from '@nestjs/common'
import TenantsService from './services/tenants.service'
import TenantsController from './controllers/tenants.controller'
import Tenant from '../@shared/entities/tenant.entity'
import Plan from '../@shared/entities/plan.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import PlansController from './controllers/plans.controller'
import PlansService from './services/plans.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Plan])],
  controllers: [TenantsController, PlansController],
  providers: [TenantsService, PlansService],
})
export class SystemAdmModule {}
