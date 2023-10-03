import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from 'src/@shared/entities/franchise.entity'
import Tenant from 'src/@shared/entities/tenant.entity'
import CaslService from './casl.service'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Franchise])],
  controllers: [],
  providers: [CaslService],
})
export class CaslModule {}
