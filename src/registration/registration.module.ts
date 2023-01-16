/* eslint-disable prettier/prettier */
import {
  Registration,
  registrationSchema,
} from './schema/registration';
import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Registration.name, schema: registrationSchema },
    ]),MulterModule.register({
      dest:'./uploads'
    })
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
