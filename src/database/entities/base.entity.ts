import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { nanoid } from 'nanoid';

export class BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 21 })
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the entity',
    example: nanoid(),
  })
  uid: string = nanoid(); // Automatically assign a unique ID

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
    example: nanoid(),
    required: false,
  })
  createdBy?: string;
}
