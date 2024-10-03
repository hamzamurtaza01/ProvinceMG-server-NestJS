/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Caller } from './caller.entity';

@Entity()
export class ContactPoint {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the contact point',
  })
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Unique number for the contact point',
  })
  @Column({ type: 'varchar', unique: true })
  number: string;

  // Many-to-One relationship with Caller
  @ManyToOne(() => Caller, (caller) => caller.contacts)
  @ApiProperty({
    type: () => Caller,
    description: 'Caller associated with this contact point',
  })
  caller: Caller;
}
