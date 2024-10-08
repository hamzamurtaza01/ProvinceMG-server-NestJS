import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the entity',
    example: uuidv4(),
  })
  id: string = uuidv4(); // Automatically assign a unique UUID

  @CreateDateColumn()
  @ApiProperty({
    type: String,
    description: 'Timestamp when the entity was created',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    type: String,
    description: 'Timestamp when the entity was last updated',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({
    type: String,
    description: 'Timestamp when the entity was deleted (soft delete)',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  deletedAt?: Date;

  @Column({ nullable: true })
  @ApiProperty({
    type: String,
    description: 'ID of the user who created this entity',
    example: uuidv4(),
    required: false,
  })
  createdBy?: string;
}
