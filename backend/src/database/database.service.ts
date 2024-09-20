import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  /**
   * Connect to database
   */
  async onModuleInit() {
    await this.$connect();
  }
}
