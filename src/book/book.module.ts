import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { Book, BookSchema } from './schema/book';
import { BookController } from './book.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
