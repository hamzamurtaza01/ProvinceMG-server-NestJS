import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Note } from './notes.entity';
import { Caller } from './caller.entity';
import { Call } from './ring-central-entity/call.entity';
import { JiraIssue } from './jira-entity/jira-issue.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Session extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  @ApiProperty({
    type: 'string',
    description: 'Jira Issue ID associated with the session',
  })
  jiraIssueId: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    type: 'string',
    description: 'RingCentral ID associated with the session',
  })
  ringCentralId: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', description: 'Title of the session' })
  title: string;

  @ManyToOne(() => Caller, (caller) => caller.sessions)
  @ApiProperty({
    type: () => Caller,
    description: 'Caller of the session',
  })
  caller: Caller;

  @OneToMany(() => Note, (note) => note.session)
  @ApiProperty({
    type: () => Note,
    isArray: true,
    description: 'Notes associated with the session',
  })
  notes: Note[];

  @Column({ type: 'datetime' })
  @ApiProperty({ type: 'string', description: 'Start time of the session' })
  startAt: Date;

  @Column({ type: 'datetime' })
  @ApiProperty({ type: 'string', description: 'End time of the session' })
  endAt: Date;

  @ManyToMany(() => User, (user) => user.sessions)
  @JoinTable({
    name: 'session_callees',
    joinColumn: { name: 'session_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'callee_id', referencedColumnName: 'id' },
  })
  @ApiProperty({
    type: () => User,
    isArray: true,
    description: 'Callees involved in the session',
  })
  callees: User[];

  @OneToOne(() => Call, (call) => call.session)
  @ApiProperty({
    type: () => Call,
    description: 'Call associated with this session based on ringCentralId',
  })
  call: Call;

  @OneToOne(() => JiraIssue, (jiraIssue) => jiraIssue.session, {
    nullable: true,
  })
  @JoinColumn({ name: 'jiraIssueId', referencedColumnName: 'id' })
  @ApiProperty({
    type: () => JiraIssue,
    description: 'The Jira issue associated with the session',
  })
  jiraIssue: JiraIssue;
}
