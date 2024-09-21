import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FriendshipsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createFriendship(user1Id: number, user2Id: number) {
    return this.databaseService.friendship.create({
      data: {
        user1Id,
        user2Id,
        status: FriendshipStatus.PENDING,
      },
    });
  }

  async updateFriendshipStatus(friendshipId: number, status: FriendshipStatus) {
    return this.databaseService.friendship.update({
      where: {
        id: friendshipId,
      },
      data: {
        status,
      },
    });
  }

  async findAll() {
    return this.databaseService.friendship.findMany();
  }

  async findOne(friendshipId: number) {
    try {
      const friendship = await this.databaseService.friendship.findUnique({
        where: {
          id: friendshipId,
        },
      });

      if (!friendship) {
        throw new NotFoundException('Friendship not found');
      }

      return friendship;
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving friendship.');
    }
  }

  async remove(friendshipId: number) {
    return this.databaseService.friendship.delete({
      where: {
        id: friendshipId,
      },
    });
  }
}
