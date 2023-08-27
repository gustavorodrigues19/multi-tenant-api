import { Test, TestingModule } from '@nestjs/testing'
import UsersService from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import Tenant from '../../@shared/entities/tenant.entity'
import Franchise from '../../@shared/entities/franchise.entity'
import { User } from '../entities/user.entity'

const providers = [
  UsersService,
  {
    provide: getRepositoryToken(Tenant),
    useClass: class mockRepository {
      findOneBy = jest.fn()
    },
  },
  {
    provide: getRepositoryToken(Franchise),
    useClass: class mockRepository {
      find = jest.fn()
    },
  },
  {
    provide: getRepositoryToken(User),
    useClass: class mockRepository {
      save = jest.fn()
      findAndCount = jest.fn()
      findOneBy = jest.fn()
    },
  },
]

describe('Users Service', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
