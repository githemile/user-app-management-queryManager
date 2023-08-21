// notification.entity.ts
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn , JoinColumn , ManyToOne, ManyToMany } from 'typeorm';

@Entity('Notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => UserEntity , user => user.notifications)
  user: UserEntity;


}
