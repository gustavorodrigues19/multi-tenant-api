import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemAdmService } from './system-adm.service';
import { CreateSystemAdmDto } from './dto/create-system-adm.dto';
import { UpdateSystemAdmDto } from './dto/update-system-adm.dto';

@Controller('system-adm')
export class SystemAdmController {
  constructor(private readonly systemAdmService: SystemAdmService) {}

  @Post()
  create(@Body() createSystemAdmDto: CreateSystemAdmDto) {
    return this.systemAdmService.create(createSystemAdmDto);
  }

  @Get()
  findAll() {
    return this.systemAdmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemAdmService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSystemAdmDto: UpdateSystemAdmDto,
  ) {
    return this.systemAdmService.update(+id, updateSystemAdmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemAdmService.remove(+id);
  }
}
