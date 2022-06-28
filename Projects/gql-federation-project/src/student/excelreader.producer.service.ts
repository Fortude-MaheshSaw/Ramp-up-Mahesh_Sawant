/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ExcelReaderService {
  constructor(@InjectQueue('excel-queue') private queue: Queue) {}
  async readExcel(file: Express.Multer.File) {
    this.queue.add('excel-job', file);
  }
}
