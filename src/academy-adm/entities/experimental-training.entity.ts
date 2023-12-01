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
import { SportCategory } from './sport-category.entity'

@Entity()
export class ExperimentalTraining {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ nullable: true, length: 255 })
  moreInfo: string

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

  @ManyToOne(() => SportCategory, (sportCategory) => sportCategory.id, {
    nullable: false,
    eager: true,
  })
  sportCategory: SportCategory
}
