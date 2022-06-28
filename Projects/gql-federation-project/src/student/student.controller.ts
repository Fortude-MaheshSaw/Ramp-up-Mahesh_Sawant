/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentService } from './student.service';
import { ExcelReaderService } from './excelreader.producer.service';
import { AppGateway } from 'src/app.gateway';

@Controller('/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly excelReaderService: ExcelReaderService,
    private readonly appGateway: AppGateway,
  ) {}

  data: any[] = [];
  post: any;

  @Post('/upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.studentService.deleteAll();
    await this.excelReaderService.readExcel(file);
  }

  @Post('/remove')
  async remove() {
    await this.studentService.deleteAll();
    this.appGateway.fileUpload('removed');
  }
}
