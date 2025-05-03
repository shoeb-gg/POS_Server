import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ShopModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
