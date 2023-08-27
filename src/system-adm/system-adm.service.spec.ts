import { Test, TestingModule } from '@nestjs/testing';
import { SystemAdmService } from './system-adm.service';

describe('SystemAdmService', () => {
  let service: SystemAdmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemAdmService],
    }).compile();

    service = module.get<SystemAdmService>(SystemAdmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
