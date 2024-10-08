import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { UserOrganisation } from './ring-central-entity/user-organisation.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Organisation extends BaseEntity {
  @Column({ type: 'varchar' })
  @ApiProperty({ type: 'string', description: 'Name of the organisation' })
  name: string;

  @OneToMany(() => User, (user) => user.organisation)
  @ApiProperty({
    type: () => User,
    isArray: true,
    description: 'List of users associated with the organisation',
  })
  users: User[];

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    type: 'string',
    description: 'Default contact number of the organisation',
  })
  defaultNumber: string;

  @OneToOne(() => UserOrganisation)
  @JoinColumn({ name: 'ringCentralId', referencedColumnName: 'id' })
  @ApiProperty({
    type: () => UserOrganisation,
    description: 'User Organisation linked to the RingCentral ID',
  })
  userOrg: UserOrganisation;

  @Column({ type: 'varchar' })
  @ApiProperty({
    type: 'string',
    description: 'RingCentral ID for organisation',
  })
  ringCentralId: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    type: 'string',
    description: 'RingCentral API key for organisation',
  })
  ringCentralApiKey: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', description: 'Jira ID for organisation' })
  jiraId: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', description: 'Jira API key for organisation' })
  jiraApiKey: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', description: 'Prosoft ID for organisation' })
  prosoftId: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    type: 'string',
    description: 'Prosoft API key for organisation',
  })
  prosoftApiKey: string;
}
