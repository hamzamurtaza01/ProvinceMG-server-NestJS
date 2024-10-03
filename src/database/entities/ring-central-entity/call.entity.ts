/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { UserOrganisation } from './user-organisation.entity';
import { Session } from '../session.entity';
@Entity()
export class Call {
  @ApiProperty({ type: 'uuid', description: 'Unique identifier for the call' })
  @Column({ type: 'uuid', primary: true })
  id: string;

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

  @ManyToOne(
    () => UserOrganisation,
    (userOrganization) => userOrganization.calls,
  )
  @ApiProperty({
    type: () => UserOrganisation,
    description: 'User Organisation associated with this call',
  })
  userOrganization: UserOrganisation;

  @OneToOne(() => Session, (session) => session.call)
  @ApiProperty({
    type: () => Session,
    description: 'Session associated with this call based on ringCentralId',
  })
  session: Session;
}
