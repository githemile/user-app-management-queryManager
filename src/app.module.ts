import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity/user.entity';
@Module({
  imports: [NotificationModule , 
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  
  ],

  controllers: [AppController ],
  providers: [AppService ],
  exports: [AppService],
})
export class AppModule {}
