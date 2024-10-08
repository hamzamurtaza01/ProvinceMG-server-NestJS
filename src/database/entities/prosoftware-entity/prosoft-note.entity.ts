import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ProsoftCoEmployee } from './prosoft-co-employee.entity';
import { Note } from '../notes.entity';

@Entity()
export class ProsoftNote extends BaseEntity {
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
