import { Test, TestingModule } from '@nestjs/testing'
import FranchisesService from './franchises.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import Tenant from '../../@shared/entities/tenant.entity'
import Franchise from '../../@shared/entities/franchise.entity'

const providers = [
  FranchisesService,
  {
    provide: getRepositoryToken(Tenant),
    useClass: class mockRepository {
      save = jest.fn()
      findAndCount = jest.fn()
      findOneBy = jest.fn()
    },
  },
  {
    provide: getRepositoryToken(Franchise),
    useClass: class mockRepository {
      findOneBy = jest.fn()
    },
  },
]

describe('Franchises Service', () => {
  let service: FranchisesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile()

    service = module.get<FranchisesService>(FranchisesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
