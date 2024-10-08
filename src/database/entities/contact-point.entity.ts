import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Caller } from './caller.entity';

@Entity()
export class ContactPoint extends BaseEntity {
  @ApiProperty({
    type: 'string',
    description: 'Unique number for the contact point',
  })
  @Column({ type: 'varchar', unique: true })
  number: string;

  @ManyToOne(() => Caller, (caller) => caller.contacts)
  @ApiProperty({
    type: () => Caller,
    description: 'Caller associated with this contact point',
  })
  caller: Caller;
}
