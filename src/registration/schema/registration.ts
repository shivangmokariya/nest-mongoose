// import { Registration } from './../entities/registration.entity';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type Registration = HydratedDocument<Registration>;

// @Schema()
// export class Registration {
//   @Prop()
//   email: string;

//   @Prop()
//   password: string;

//   @Prop()
//   confirmPassword: string;
// }

// export const CatSchema = SchemaFactory.createForClass(Cat);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;

@Schema()
export class Registration {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cPassword: string;
}

export const registrationSchema = SchemaFactory.createForClass(Registration);
