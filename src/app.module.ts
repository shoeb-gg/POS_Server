import { UtilsModule } from './modules/utils/utils.module';
import { ShopModule } from './modules/shop/shop.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SupplierModule } from './modules/entities/supplier/supplier.module';
import { AuthGuard } from './core/utils/user-auth.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CustomerModule } from './modules/entities/customer/customer.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    UtilsModule,
    ShopModule,
    UserModule,
    AuthModule,
    SupplierModule,
    CustomerModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    JwtService,
  ],
})
export class AppModule {}
