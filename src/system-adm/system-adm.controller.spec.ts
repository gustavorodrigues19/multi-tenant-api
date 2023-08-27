import { Test, TestingModule } from '@nestjs/testing';
import { SystemAdmController } from './system-adm.controller';
import { SystemAdmService } from './system-adm.service';

describe('SystemAdmController', () => {
  let controller: SystemAdmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemAdmController],
      providers: [SystemAdmService],
    }).compile();

    controller = module.get<SystemAdmController>(SystemAdmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
