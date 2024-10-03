/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { JiraIssue } from './jira-issue.entity';
import { Caller } from '../caller.entity';

@Entity()
export class JiraOrganisation {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the Jira organisation',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @OneToMany(() => JiraIssue, (issue) => issue.target)
  @ApiProperty({
    type: () => JiraIssue,
    isArray: true,
    description: 'Issues related to this Jira organisation',
  })
  issues: JiraIssue[];

  @OneToOne(() => Caller, (caller) => caller.jiraOrganisation)
  @ApiProperty({
    type: () => Caller,
    description: 'Caller associated with this Jira organisation',
  })
  caller: Caller;
}
