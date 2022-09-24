import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Authentication } from './authentication';
import { Authorization } from './authorization';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ClaimsModule } from './claims/claims.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/datasintesa_db'),
    ProductsModule,
    UsersModule,
    ClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authentication)
      .forRoutes(
        { path: 'users', method: RequestMethod.ALL },
        'users/pending',
        'users/pending/(.*)',
        'products',
        'products/(.*)',
        'claims',
        'claims/(.*)',
      );
    consumer
      .apply(Authorization)
      .exclude(
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/(.*)', method: RequestMethod.GET },
        { path: 'claims/(.*)', method: RequestMethod.POST },
      )
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        'users/pending',
        'users/pending/(.*)',
        'products',
        'products/(.*)',
        'claims',
        'claims/(.*)',
      );
  }
}
