import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartentryModule } from './cartentry/cartentry.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, CartentryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
