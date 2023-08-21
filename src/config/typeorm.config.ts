import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { NotificationEntity } from "src/notification/entities/notification.entity/notification.entity";
import { UserEntity } from "../user/entities/user.entity/user.entity";


export const typeOrmConfig: TypeOrmModuleOptions= {
    
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username : 'postgres',
    password : 'postgres',
    database : 'user_db',
    entities: [NotificationEntity , UserEntity],
    synchronize : true,
}
