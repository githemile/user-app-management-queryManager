import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { DataSource, QueryRunner, Connection } from 'typeorm';
import { CreateUserDto } from './create-user-dto/create-user.dto';
import { UpdateUserDto } from './update-user-dto/update-user.dto';
import { UserEntity } from './entities/user.entity/user.entity';
import { NotificationDto } from 'src/notification/notification-dto/notification.dto';
import { normalize } from 'path';
import { InjectConnection } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/notification/entities/notification.entity/notification.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly dataSource: DataSource,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  // creation de l'utilisateur

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.firstname = createUserDto.firstname;
      user.lastname = createUserDto.lastname;
      user.age = createUserDto.age;

      await queryRunner.manager.save(user);

      // // Créer automatiquement une notification pour l'utilisateur
      const message = `created ${user.firstname}`;
      const notif = new NotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        user,
      );

      await queryRunner.commitTransaction();
      return { message: `  ${user.firstname} created` };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // mettre a jour un utilisateur
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneOrFail(UserEntity, {
        where: { id },
      });

      user.firstname = updateUserDto.firstname;
      user.lastname = updateUserDto.lastname;
      user.age = updateUserDto.age;

      await queryRunner.manager.save(user);

      //    // Enregistrez une notification
      const message = `updated ${user.firstname}`;
      const notif = new NotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        user,
      );

      await queryRunner.commitTransaction();
      return { message: ` ${user.id} => ${user.firstname} updated` };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(id: number) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userdeleted = await queryRunner.manager.findOneOrFail(UserEntity, {
        where: { id },
      });

      await queryRunner.manager.delete(UserEntity, id);

      //    // Enregistrez une notification
      const message = `deleted ${userdeleted.firstname}`;
      const notif = new NotificationDto();
      notif.message = message;

      await this.notificationService.createNotification(
        queryRunner,
        notif,
        userdeleted,
      );

      await queryRunner.commitTransaction();
      return {
        message: ` ${userdeleted.id} => ${userdeleted.firstname} deleted`,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllUsers() {
    const user = new UserEntity();
    const allUsers = await this.connection.manager.find(UserEntity);
    return { message: 'Les utilisateurs : ', user: allUsers };
  }

  async getUser(id: number) {
    const userID = await this.connection.manager.findOne(UserEntity, {
      where: { id },
    });
    return { message: `Utilisateur: ${userID.id} `, user: userID };
  }
}
