import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserOrganisation } from './user-organisation.entity';
import { Session } from '../session.entity';

@Entity()
export class Call extends BaseEntity {
  @ApiProperty({
    type: 'string',
    description: 'Caller number associated with the call',
  })
  @Column({ type: 'varchar' })
  callerNumber: string;

  @ApiProperty({
    type: 'string',
    description: 'Callee number associated with the call',
  })
  @Column({ type: 'varchar' })
  calleeNumber: string;

  @Column({ type: 'uuid', nullable: true })
  @ApiProperty({
    type: 'uuid',
    description: 'User Organisation ID associated with the call',
  })
  userOrganisationId: string;

  @ManyToOne(
    () => UserOrganisation,
    (userOrganisation) => userOrganisation.calls,
  )
  @ApiProperty({
    type: () => UserOrganisation,
    description: 'User Organisation associated with this call',
  })
  userOrganisation: UserOrganisation;

  @OneToOne(() => Session, (session) => session.ringCentralId)
  @ApiProperty({
    type: () => Session,
    description: 'Session associated with this call based on ringCentralId',
  })
  session: Session;
}
