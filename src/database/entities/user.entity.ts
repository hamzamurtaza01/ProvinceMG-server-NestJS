import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Organisation } from './organisation.entity';
import { Session } from './session.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ type: 'uuid', description: 'User ID' })
  @ApiProperty({ type: 'string', description: 'Name of the user' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ type: 'string', description: 'User extension number' })
  @Column({ type: 'varchar', length: 255 })
  extension: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Whether the user is active or not',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Organisation, (organisation) => organisation.users)
  @ApiProperty({
    type: () => Organisation,
    description: 'The organisation to which this user belongs',
  })
  organisation: Organisation;

  @ManyToMany(() => Session, (session) => session.callees)
  @JoinTable({
    name: 'user_session',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'session_id', referencedColumnName: 'id' },
  })
  @ApiProperty({
    type: () => Session,
    isArray: true,
    description: 'Sessions associated with this user',
  })
  sessions: Session[];
}
