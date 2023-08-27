import { Module } from '@nestjs/common'
import UsersService from './services/users.service'
import UsersController from './controllers/users.controller'
import Tenant from '../@shared/entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from '../@shared/entities/franchise.entity'
import { User } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Franchise, User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AuthenticationModule {}
