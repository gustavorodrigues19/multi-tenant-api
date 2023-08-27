import { Module } from '@nestjs/common';
import { SystemAdmService } from './system-adm.service';
import { SystemAdmController } from './system-adm.controller';

@Module({
  controllers: [SystemAdmController],
  providers: [SystemAdmService],
})
export class SystemAdmModule {}
