import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { JiraIssue } from './jira-issue.entity';
import { Note } from '../notes.entity';

@Entity()
export class JiraComment extends BaseEntity {
  @ManyToOne(() => JiraIssue, (issue) => issue.comments)
  @ApiProperty({
    type: () => JiraIssue,
    description: 'The issue to which this comment belongs',
  })
  issue: JiraIssue;

  @OneToOne(() => Note, (note) => note.jiraId)
  @ApiProperty({
    type: () => Note,
    description: 'Note associated with this Jira comment',
  })
  note: Note;
}
