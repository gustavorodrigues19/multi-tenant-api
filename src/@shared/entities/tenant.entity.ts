import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Plan from './plan.entity'

@Entity()
export default class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 20 })
  document: string

  @Column({ length: 100 })
  domain: string

  @Column({ length: 255 })
  logoUrlDark: string

  @Column({ length: 255 })
  logoUrlLight: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // Relationships
  @ManyToOne(() => Plan, (plan) => plan.id, {
    nullable: false,
    eager: true,
  })
  plan: Plan
}
