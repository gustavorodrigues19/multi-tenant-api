import { Test, TestingModule } from '@nestjs/testing'
import UsersController from './users.controller'
import UsersService from '../services/users.service'

const providers = [
  UsersService,
  {
    provide: UsersService,
    useClass: class mockService {
      createTenantUseCase = jest.fn()
      findAllUsersUseCase = jest.fn()
      findTenantUseCase = jest.fn()
      updateTenantUseCase = jest.fn()
    },
  },
]
describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers,
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
