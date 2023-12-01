import { User } from 'src/authentication/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Team } from './team.entity'
import Tenant from 'src/@shared/entities/tenant.entity'
import Franchise from 'src/@shared/entities/franchise.entity'

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 20 })
  document: string

  @Column({ length: 10 })
  gender: string

  @Column({ nullable: true })
  birthday: Date

  @Column({ length: 20 })
  phone: string

  @Column({ length: 100 })
  email: string

  @Column({ default: true })
  active: boolean

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

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: true,
  })
  user: User

  @ManyToMany(() => Team, (team) => team.athletes)
  teams: Team[]
}
