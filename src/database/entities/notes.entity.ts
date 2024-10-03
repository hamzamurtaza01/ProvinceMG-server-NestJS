/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Session } from './session.entity'; // Adjust the path as necessary
import { JiraComment } from './jira-entity/jira-comment.entity';
import { ProsoftNote } from './prosoftware-entity/prosoft-note.entity';

@Entity()
export class Note {
  @ApiProperty({ type: 'uuid', description: 'Unique identifier for the note' })
  @Column({ type: 'uuid', primary: true, generated: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string', description: 'Title of the note' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ type: 'string', description: 'Description of the note' })
  @Column({ type: 'text' })
  desc: string;

  @ManyToOne(() => Session, (session) => session.notes)
  @ApiProperty({
    type: () => Session,
    description: 'The session associated with this note',
  })
  session: Session;

  @OneToOne(() => JiraComment)
  @JoinColumn({ name: 'jiraId', referencedColumnName: 'id' })
  @ApiProperty({
    type: () => JiraComment,
    description: 'Jira comment associated with the note',
  })
  jiraId: JiraComment;

  @ApiProperty({
    type: 'string',
    description: 'Prosoft ID associated with the note',
  })
  @Column({ type: 'varchar', length: 255 })
  prosoftId: string;

  @OneToOne(() => ProsoftNote, (prosoftNote) => prosoftNote.note, {
    nullable: false,
  })
  @ApiProperty({
    type: () => ProsoftNote,
    description: 'Prosoft note associated with this note',
  })
  prosoftNote: ProsoftNote;
}
