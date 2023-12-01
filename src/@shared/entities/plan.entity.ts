import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export default class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  name: string

  @Column({ length: 255, nullable: true })
  description: string

  @Column()
  price: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
