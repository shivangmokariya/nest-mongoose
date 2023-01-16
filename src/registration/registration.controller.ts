import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import {
  CreateLoginDto,
  CreateRegistrationDto,
} from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(createRegistrationDto);
  }
  @Post('login')
  Login(@Body() CreateLoginDto: CreateLoginDto) {
    return this.registrationService.Login(CreateLoginDto);
  }

  @Post('fileUpload')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'profile',
        maxCount: 2,
      },
      {
        name: 'profile2',
        maxCount: 2,
      },
    ]),
  )
  fileUpload(
    @UploadedFiles()
    profile: {
      profile?: Express.Multer.File[];
      profile2?: Express.Multer.File[];
    },
  ) {
    return this.registrationService.fileUpload(profile);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return this.registrationService.update(id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(id);
  }
}
