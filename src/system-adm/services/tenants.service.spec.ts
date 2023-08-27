import { Test, TestingModule } from '@nestjs/testing'
import TenantsService from './tenants.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import Tenant from '../../@shared/entities/tenant.entity'
import Plan from '../../@shared/entities/plan.entity'

const providers = [
  TenantsService,
  {
    provide: getRepositoryToken(Tenant),
    useClass: class mockRepository {
      save = jest.fn()
      find = jest.fn()
      findOneBy = jest.fn()
    },
  },
  {
    provide: getRepositoryToken(Plan),
    useClass: class mockRepository {
      findOneBy = jest.fn()
    },
  },
]

describe('Tenants Service', () => {
  let service: TenantsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile()

    service = module.get<TenantsService>(TenantsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
