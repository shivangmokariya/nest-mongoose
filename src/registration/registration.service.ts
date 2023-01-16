import { Registration, RegistrationDocument } from './schema/registration';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  CreateRegistrationDto,
  CreateLoginDto,
} from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegistrationService {
  Registration: any;
  constructor(
    @InjectModel(Registration.name)
    private RegistrationDocument: Model<RegistrationDocument>,
  ) {}
  create = async (createRegistrationDto: CreateRegistrationDto) => {
    const model = new this.RegistrationDocument(createRegistrationDto);
    // model.cPassword = createRegistrationDto.cPassword;
    model.password = await bcrypt.hash(model.password, 10);
    model.cPassword = await bcrypt.hash(model.cPassword, 10);
    // console.log(model.password);
    console.log(createRegistrationDto);
    return model.save();

    // return createRegistrationDto.save();
  };

  Login = async (CreateLoginDto: CreateLoginDto) => {
    const model = new this.RegistrationDocument(CreateLoginDto);
    // console.log(model);
    const data = await this.RegistrationDocument.find({
      email: model.email,
    }).exec();
    let isMatch;
    // console.log(data[0], '+++++++');
    if (data[0] !== undefined) {
      isMatch = await bcrypt.compare(model.password, data[0].password);
      console.log(data[0].password);
      if (isMatch == true) {
        return { status: 200, msg: 'successsfully logged in' };
      } else {
        return { status: 400, msg: 'invalid crediantial' };
      }
    } else {
      return { status: 400, msg: 'invalid crediantial' };
    }
    // console.log(data[0].email);
  };

  fileUpload(profile) {
    console.log(profile.profile.length);
    for (let f = 0; f < profile.profile.length; f++) {
      const element = profile.profile[f];
      const oldName = 'uploads/' + element.filename;
      const filePath = 'uploads/' + element.filename + element.originalname;
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fs.rename(oldName, filePath, () => {});
      const filePathMove = 'uploads/' + element.filename + element.originalname;
      console.log('success!' + filePathMove);
      // updateData.profile = filePathMove;
      console.log(element);
    }
    // console.log(profile.profile2);
    if (profile.profile2 !== undefined) {
      for (let f = 0; f < profile.profile2.length; f++) {
        const element = profile.profile2[f];
        const oldName = 'uploads/' + element.filename;
        const filePath = 'uploads/' + element.filename + element.originalname;
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fs.rename(oldName, filePath, () => {});
        const filePathMove =
          'uploads/' + element.filename + element.originalname;
        console.log('success!' + filePathMove);
        // updateData.profile = filePathMove;
        console.log(element);
      }
    } else {
      return { status: 200, msg: 'profile successfully uploaded' };
    }

    return { status: 200, msg: 'profile successfully uploaded' };
  }

  findAll() {
    return this.RegistrationDocument.find().exec();
  }

  findOne(id: string) {
    return this.RegistrationDocument.find({ _id: id }).exec();
  }

  update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: string) {
    return `This action removes a #${id} registration`;
  }
}
