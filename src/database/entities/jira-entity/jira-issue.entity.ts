/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { JiraOrganisation } from './jira-organisation.entity';
import { JiraComment } from './jira-comment.entity';

@Entity()
export class JiraIssue {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the Jira issue',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @ManyToOne(() => JiraOrganisation, (organisation) => organisation.issues)
  @ApiProperty({
    type: () => JiraOrganisation,
    description: 'The organisation that owns this issue',
  })
  target: JiraOrganisation;

  @OneToMany(() => JiraComment, (comment) => comment.issue)
  @ApiProperty({
    type: () => JiraComment,
    isArray: true,
    description: 'Comments related to this Jira issue',
  })
  comments: JiraComment[];
}
