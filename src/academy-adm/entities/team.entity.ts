import Franchise from 'src/@shared/entities/franchise.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Athlete } from './athlete.entity'
import Tenant from 'src/@shared/entities/tenant.entity'

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  name: string

  @Column('time', { name: 'startTime' })
  startTime: Date

  @Column('time', { name: 'endTime' })
  endTime: Date

  @Column({ length: 100 })
  days: string

  @Column({ length: 20 })
  gender: string

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // Relationships
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

  @ManyToMany(() => Athlete, (athlete) => athlete.teams, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  athletes: Athlete[]
}
