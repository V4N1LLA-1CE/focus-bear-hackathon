import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { FriendshipsModule } from './friendships/friendships.module';

@Module({
  imports: [DatabaseModule, UsersModule, FriendshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
