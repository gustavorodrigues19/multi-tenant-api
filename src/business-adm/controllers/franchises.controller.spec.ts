import { Test, TestingModule } from '@nestjs/testing'
import TenantsController from './franchises.controller'
import TenantsService from '../services/franchises.service'

const providers = [
  TenantsService,
  {
    provide: TenantsService,
    useClass: class mockService {
      createTenantUseCase = jest.fn()
      findAllTenantsUseCase = jest.fn()
      findTenantUseCase = jest.fn()
      updateTenantUseCase = jest.fn()
    },
  },
]
describe('TenantsController', () => {
  let controller: TenantsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantsController],
      providers,
    }).compile()

    controller = module.get<TenantsController>(TenantsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
