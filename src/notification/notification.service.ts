import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { NotificationEntity } from './entities/notification.entity/notification.entity';
import { DataSource, Connection, QueryRunner } from 'typeorm';
import { CreateUserDto } from 'src/user/create-user-dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity/user.entity';
import { NotificationDto } from './notification-dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly connection: Connection) {}

  // fonction creation de la notification
  async createNotification(
    queryRunner: QueryRunner,
    dtoNotification: NotificationDto,
    user: UserEntity,
  ) {
    try {
      const notification = new NotificationEntity();

      notification.message = dtoNotification.message;
      notification.user = user;

      queryRunner.manager.save(notification);
      //    return userNotification;
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create notification');
      }
    }
  }

  // recuperer les notifcations
  async getNotifications() {
    return this.connection.manager.find(NotificationEntity);
  }

  // recueprer notification par id
  async getNotification(id: number) {
    return this.connection.manager.findOne(UserEntity, { where: { id } });
  }
}
