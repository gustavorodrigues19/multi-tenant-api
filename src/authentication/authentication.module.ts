import { Module } from '@nestjs/common'
import UsersService from './services/users.service'
import UsersController from './controllers/users.controller'
import Tenant from '../@shared/entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from '../@shared/entities/franchise.entity'
import { User } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import AuthController from './controllers/authentication.controller'
import AuthenticationService from './services/authentication.service'
import CaslService from 'src/casl/casl.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, Franchise, User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthenticationService, CaslService],
})
export class AuthenticationModule {}
