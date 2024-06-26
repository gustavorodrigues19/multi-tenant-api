// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SystemAdmModule } from './system-adm/system-adm.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from './@shared/entities/franchise.entity'
import Plan from './@shared/entities/plan.entity'
import Tenant from './@shared/entities/tenant.entity'
import { BusinessAdmModule } from './business-adm/business.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './authentication/guards/auth.guard'
import { CaslModule } from './casl/casl.module'
import { AcademyAdmModule } from './academy-adm/academy-adm.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Tenant, Plan, Franchise],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    SystemAdmModule,
    BusinessAdmModule,
    AuthenticationModule,
    AcademyAdmModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
