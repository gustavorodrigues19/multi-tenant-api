import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Tenant from './tenant.entity'

@Entity()
export default class Franchise {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 100 })
  email: string

  @Column({ length: 20 })
  phone: string

  @Column({ length: 20 })
  document: string

  @Column({ length: 100 })
  street: string

  @Column({ length: 25 })
  number: string

  @Column({ length: 100 })
  neighborhood: string

  @Column({ nullable: true, length: 100 })
  complement: string

  @Column({ length: 20 })
  zipCode: string

  @Column({ length: 50 })
  city: string

  @Column({ length: 50 })
  state: string

  @Column({ length: 50 })
  country: string

  @Column({ nullable: true, length: 255 })
  medicalReportUrl: string

  @Column({ default: true })
  isActive: boolean

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
}
