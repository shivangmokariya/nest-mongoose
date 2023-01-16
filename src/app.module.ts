import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_uri'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
    RegistrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
