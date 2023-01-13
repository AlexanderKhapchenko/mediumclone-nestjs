import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow')
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
