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

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  document: string

  @Column()
  street: string

  @Column()
  number: string

  @Column()
  neighborhood: string

  @Column({ nullable: true })
  complement: string

  @Column()
  zipCode: string

  @Column()
  city: string

  @Column()
  state: string

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
}
