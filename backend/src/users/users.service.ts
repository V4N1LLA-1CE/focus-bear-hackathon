import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  // Inject database service
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    // Generate a random dailyStats value between 0 and 365
    const randomDailyStats = Math.floor(Math.random() * 366);

    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        dailyStats: randomDailyStats, // Set the generated random value
      },
    });
  }

  async findAll(role?: 'USER' | 'ADMIN') {
    // Check if role is passed
    return this.databaseService.user.findMany({
      include: {
        friendshipsSent: {
          include: {
            user2: true, // Make sure you're including related fields
          },
        },
        friendshipsReceived: {
          include: {
            user1: true, // Include related fields for received friendships
          },
        },
      },
      where: role ? { role } : undefined, // Only filter by role if provided
    });
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        include: {
          friendshipsSent: {
            include: {
              user2: true, // Make sure you're including related fields
            },
          },
          friendshipsReceived: {
            include: {
              user1: true, // Include related fields for received friendships
            },
          },
        },
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('Error retrieving user.');
      }

      return user;
    } catch (err) {
      throw new InternalServerErrorException('Error retrieving user.');
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: {
        username,
      },
    });
  }
}
