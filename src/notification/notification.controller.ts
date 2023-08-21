import { Controller, Param, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './notification-dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notifcationService: NotificationService) {}

  @Get(':id')
  async GetNotification(@Param('id') id: number) {
    return this.notifcationService.getNotification(id);
  }

  @Get()
  async GetNotifications() {
    return this.notifcationService.getNotifications();
  }
}
