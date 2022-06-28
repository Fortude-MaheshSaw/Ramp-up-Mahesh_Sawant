/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async createStudent(student: CreateStudentDTO) {
    let stud = this.studentRepository.create(student);
    await this.studentRepository.save(stud);
    return 'student created';
  }

  async getOne(id: string) {
    return this.studentRepository.findOne(id);
  }

  async delete(id: string) {
    await this.studentRepository.delete(id);
    return 'deleted student with id : ' + id;
  }

  async update(student: Student) {
    let stud = {
      name: student.name,
      email: student.email,
      dob: student.dob,
    };
    await this.studentRepository.update(student.id, stud);
    return 'updated student with id : ' + student.id;
  }
}
