/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import * as Excel from 'exceljs';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from '../student/student.service';
import { AppGateway } from 'src/app.gateway';

@Processor('excel-queue')
export class ExcelConsumer {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private readonly studentService: StudentService,
    private readonly appGateway: AppGateway,
  ) {}

  @Process('excel-job')
  async readExcelJob(job: Job<Express.Multer.File>) {
    let file: any = job.data;
    let data: any = [];
    let workbook = new Excel.Workbook();
    await workbook.xlsx.load(file.buffer.data);
    const worksheet = workbook.worksheets[0];
    let row = <any>worksheet.getRow(1);
    if (
      row.getCell(2).value.toLowerCase() == 'name' &&
      row.getCell(3).value.toLowerCase() == 'email' &&
      row.getCell(4).value.toLowerCase() == 'dob'
    ) {
      data = [];
      for (let i = 2; i <= worksheet.actualRowCount; i++) {
        let email: any;
        email = worksheet.getRow(i).getCell(3).value;
        let stud = {
          name: worksheet.getRow(i).getCell(2).value,
          email: email.text,
          dob: worksheet.getRow(i).getCell(4).value,
        };
        data.push(stud);
      }
    }

    if (data.length > 0) {
      let students = await this.studentRepository.create(data);
      await this.studentRepository.save(students);
      this.appGateway.fileUpload('success');
    } else {
      this.appGateway.fileUpload('failed');
    }
  }
}
