import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ProsoftNote } from './prosoft-note.entity';
import { Caller } from '../caller.entity';

@Entity()
export class ProsoftCoEmployee extends BaseEntity {
  @OneToMany(() => ProsoftNote, (note) => note.coEmployee)
  @ApiProperty({
    type: () => ProsoftNote,
    isArray: true,
    description: 'Notes associated with this ProsoftCoEmployee',
  })
  notes: ProsoftNote[];

  @OneToOne(() => Caller, (caller) => caller.prosoftCoEmployee)
  @ApiProperty({
    type: () => Caller,
    description: 'Caller associated with the ProsoftCoEmployee',
  })
  caller: Caller;
}
