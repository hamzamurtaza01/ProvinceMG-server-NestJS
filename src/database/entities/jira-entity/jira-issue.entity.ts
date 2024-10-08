import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { JiraOrganisation } from './jira-organisation.entity';
import { JiraComment } from './jira-comment.entity';
import { Session } from '../session.entity';

@Entity()
export class JiraIssue extends BaseEntity {
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

  @OneToOne(() => Session, (session) => session.jiraIssue, { nullable: true })
  @ApiProperty({
    type: () => Session,
    description: 'Session associated with this Jira issue',
  })
  session: Session;
}
