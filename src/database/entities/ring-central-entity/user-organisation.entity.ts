import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Call } from './call.entity';
import { Organisation } from '../organisation.entity';

@Entity()
export class UserOrganisation extends BaseEntity {
  @ApiProperty({
    type: () => Call,
    isArray: true,
    description: 'Calls associated with this user organisation',
  })
  @OneToMany(() => Call, (call) => call.userOrganisation)
  calls: Call[];

  @ApiProperty({ type: 'string', description: 'Name of the user organisation' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Default contact number of the user organisation',
  })
  @Column({ type: 'varchar' })
  defaultNumber: string;

  @OneToOne(() => Organisation, (organisation) => organisation.ringCentralId, {
    nullable: false,
  })
  @ApiProperty({
    type: () => Organisation,
    description: 'Organisation associated with this user organisation',
  })
  organisation: Organisation;
}
