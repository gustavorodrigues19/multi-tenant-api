import { Injectable } from '@nestjs/common';
import { CreateSystemAdmDto } from './dto/create-system-adm.dto';
import { UpdateSystemAdmDto } from './dto/update-system-adm.dto';

@Injectable()
export class SystemAdmService {
  create(createSystemAdmDto: CreateSystemAdmDto) {
    return 'This action adds a new systemAdm';
  }

  findAll() {
    return `This action returns all systemAdm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemAdm`;
  }

  update(id: number, updateSystemAdmDto: UpdateSystemAdmDto) {
    return `This action updates a #${id} systemAdm`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemAdm`;
  }
}
