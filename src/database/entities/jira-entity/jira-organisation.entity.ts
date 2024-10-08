import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { JiraIssue } from './jira-issue.entity';
import { Caller } from '../caller.entity';

@Entity()
export class JiraOrganisation extends BaseEntity {
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
