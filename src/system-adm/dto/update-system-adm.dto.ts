import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemAdmDto } from './create-system-adm.dto';

export class UpdateSystemAdmDto extends PartialType(CreateSystemAdmDto) {}
