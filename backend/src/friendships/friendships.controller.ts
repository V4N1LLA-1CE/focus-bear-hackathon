import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipStatus } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Post(':user1Id/:user2Id')
  create(
    @Param('user1Id') userThatInitiatesFriendship: number,
    @Param('user2Id') userThatReceivesFriendship: number,
  ) {
    return this.friendshipsService.createFriendship(
      Number(userThatInitiatesFriendship),
      Number(userThatReceivesFriendship),
    );
  }

  @Patch(':id')
  update(
    @Param('id') friendshipId: number,
    @Body('status') status: FriendshipStatus,
  ) {
    return this.friendshipsService.updateFriendshipStatus(
      Number(friendshipId),
      status,
    );
  }

  @Get()
  findAll() {
    return this.friendshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') friendshipId: string) {
    return this.friendshipsService.findOne(+friendshipId);
  }

  @Delete(':id')
  remove(@Param('id') friendshipId: string) {
    return this.friendshipsService.remove(+friendshipId);
  }
}
