
import { NotificationEntity } from "src/notification/entities/notification.entity/notification.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Users')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname : string;

    @Column()
    lastname: string;

    @Column()
    age : number;

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updatedAt : Date;

      // ... d'autres propriétés de l'utilisateur

      @OneToMany(() => NotificationEntity, notification => notification.user)
      notifications: NotificationEntity[];
}
