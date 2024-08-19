import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IRoom } from '../interfaces/room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'customer' })
export class Room implements IRoom {
  @ApiProperty({
    description: 'ID do usuário. Gerado a partir de um uuid4.',
    type: String,
    required: true,
  })
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    name: 'company',
    nullable: false,
  })
  company: string;

  @Column({
    name: 'email',
  })
  email: string;
}
