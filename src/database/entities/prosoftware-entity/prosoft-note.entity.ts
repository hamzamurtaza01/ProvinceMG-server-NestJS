/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ProsoftCoEmployee } from './prosoft-co-employee.entity';
import { Note } from '../notes.entity';

@Entity()
export class ProsoftNote {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the ProsoftNote',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @OneToOne(() => Note, (note) => note.prosoftNote, { nullable: false })
  @JoinColumn({ name: 'prosoftId', referencedColumnName: 'prosoftId' })
  @ApiProperty({
    type: () => Note,
    description: 'Note associated with the ProsoftNote',
  })
  note: Note;

  @ManyToOne(() => ProsoftCoEmployee, (coEmployee) => coEmployee.notes)
  @ApiProperty({
    type: () => ProsoftCoEmployee,
    description: 'CoEmployee associated with this ProsoftNote',
  })
  coEmployee: ProsoftCoEmployee;
}
