import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactPoint } from './contact-point.entity';
import { Session } from './session.entity';
import { JiraOrganisation } from './jira-entity/jira-organisation.entity';
import { ProsoftCoEmployee } from './prosoftware-entity/prosoft-co-employee.entity';

@Entity()
export class Caller extends BaseEntity {
  @ApiProperty({ type: 'string', description: 'Name of the caller' })
  @Column({ type: 'string' })
  name: string;

  @OneToMany(() => ContactPoint, (contactPoint) => contactPoint.caller)
  @ApiProperty({
    type: () => ContactPoint,
    isArray: true,
    description: 'Contacts associated with the caller',
  })
  contacts: ContactPoint[];

  @ApiProperty({
    type: 'string',
    description: 'Jira ID associated with the caller',
  })
  @Column({ type: 'uuid', nullable: false })
  jiraId: string;

  @OneToOne(() => JiraOrganisation)
  @JoinColumn({ name: 'jiraId', referencedColumnName: 'id' })
  @ApiProperty({
    type: () => JiraOrganisation,
    description: 'Jira Organisation associated with the caller',
  })
  jiraOrganisation: JiraOrganisation;

  @ApiProperty({
    type: 'string',
    description: 'Prosoft ID associated with the caller',
  })
  @Column({ type: 'string', nullable: true })
  prosoftId: string;

  @OneToOne(() => ProsoftCoEmployee)
  @JoinColumn({ name: 'prosoftId', referencedColumnName: 'id' })
  @ApiProperty({
    type: () => ProsoftCoEmployee,
    description: 'ProsoftCoEmployee associated with the caller',
  })
  prosoftCoEmployee: ProsoftCoEmployee;

  @OneToMany(() => Session, (session) => session.caller)
  @ApiProperty({
    type: () => Session,
    isArray: true,
    description: 'Sessions associated with the caller',
  })
  sessions: Session[];

  @ApiProperty({ type: 'boolean', description: 'Is co-employee' })
  @Column({ type: 'boolean', default: false })
  isCoEmployee: boolean;
}
