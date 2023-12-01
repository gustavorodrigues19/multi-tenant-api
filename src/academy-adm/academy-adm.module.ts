import { Module } from '@nestjs/common'
import Tenant from '../@shared/entities/tenant.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import Franchise from '../@shared/entities/franchise.entity'
import CaslService from 'src/casl/casl.service'
import { Athlete } from './entities/athlete.entity'
import { ExperimentalTraining } from './entities/experimental-training.entity'
import { MedicalTerm } from './entities/medical-term.entity'
import { SportCategory } from './entities/sport-category.entity'
import { Team } from './entities/team.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tenant,
      Franchise,
      Athlete,
      ExperimentalTraining,
      MedicalTerm,
      SportCategory,
      Team,
    ]),
  ],
  controllers: [],
  providers: [CaslService],
})
export class AcademyAdmModule {}
