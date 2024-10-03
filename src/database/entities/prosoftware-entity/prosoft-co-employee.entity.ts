/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { ProsoftNote } from './prosoft-note.entity';
import { Caller } from '../caller.entity';

@Entity()
export class ProsoftCoEmployee {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the ProsoftCoEmployee',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @OneToMany(() => ProsoftNote, (note) => note.coEmployee)
  @ApiProperty({
    type: () => ProsoftNote,
    isArray: true,
    description: 'Notes associated with this ProsoftCoEmployee',
  })
  notes: ProsoftNote[];
  @OneToOne(() => Caller, (caller) => caller.prosoftCoEmployee) // Establish the reverse side of the relation
  @ApiProperty({
    type: () => Caller,
    description: 'Caller associated with the ProsoftCoEmployee',
  })
  caller: Caller;
}
