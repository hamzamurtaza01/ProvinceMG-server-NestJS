/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Call } from './call.entity';
import { Organisation } from '.././organisation.entity'; // Adjust the import path as necessary

@Entity()
export class UserOrganisation {
  @ApiProperty({
    type: 'uuid',
    description: 'Unique identifier for the user organisation',
  })
  @Column({ type: 'uuid', primary: true })
  id: string;

  @ApiProperty({ type: 'string', description: 'Name of the user organisation' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Default contact number of the user organisation',
  })
  @Column({ type: 'varchar' })
  defaultNumber: string;

  @OneToMany(() => Call, (call) => call.userOrganization)
  @ApiProperty({
    type: () => Call,
    isArray: true,
    description: 'Calls associated with this user organisation',
  })
  calls: Call[];

  // One-to-One relationship with Organisation
  @ManyToOne(() => Organisation, (organisation) => organisation.ringCentralId, {
    nullable: false,
  })
  @ApiProperty({
    type: () => Organisation,
    description: 'Organisation associated with this user organisation',
  })
  organisation: Organisation;
}
