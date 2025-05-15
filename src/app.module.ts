import { UtilsModule } from './modules/utils/utils.module';
import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/auth/utils/user-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UtilsModule, ShopModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
