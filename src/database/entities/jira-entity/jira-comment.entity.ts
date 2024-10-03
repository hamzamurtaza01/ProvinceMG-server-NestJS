/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { JiraIssue } from './jira-issue.entity';

@Entity()
export class JiraComment {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the Jira comment',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @ManyToOne(() => JiraIssue, (issue) => issue.comments)
  @ApiProperty({
    type: () => JiraIssue,
    description: 'The issue to which this comment belongs',
  })
  issue: JiraIssue;
}
