import { Module } from '@nestjs/common';
import { CartentryService } from './cartentry.service';
import { CartentryController } from './cartentry.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CartentryController],
  providers: [CartentryService, PrismaService],
})
export class CartentryModule {}
