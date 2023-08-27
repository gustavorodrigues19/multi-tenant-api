import Franchise from '../../@shared/entities/franchise.entity'
import Tenant from '../../@shared/entities/tenant.entity'
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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 25 })
  username: string

  @Column({ length: 45 })
  email: string

  @Column({ length: 255 })
  passwd: string

  @Column({ length: 20 })
  role: string

  @Column({ length: 5 })
  language: string

  @Column({ default: true })
  isActive: boolean

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

  @ManyToMany(() => Franchise, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  franchises: Franchise[]
}
