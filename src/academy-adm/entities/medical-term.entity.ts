import Franchise from 'src/@shared/entities/franchise.entity'
import Tenant from 'src/@shared/entities/tenant.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Athlete } from './athlete.entity'

@Entity()
export class MedicalTerm {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, length: 255 })
  medicalReportUrl: string

  @Column({ nullable: true, length: 255 })
  signatureUrl: string

  @Column({ length: 20 })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  //Relationships
  @ManyToOne(() => Tenant, (tenant) => tenant.id, {
    nullable: false,
    eager: true,
  })
  tenant: Tenant

  @ManyToOne(() => Franchise, (franchise) => franchise.id, {
    nullable: false,
    eager: true,
  })
  franchise: Franchise

  @ManyToOne(() => Athlete, (athlete) => athlete.id, {
    nullable: false,
    eager: true,
  })
  athlete: Athlete
}
