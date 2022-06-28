/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  const mockStudentRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((student) =>
        Promise.resolve({ id: 12122221, ...student }),
      ),
    update: jest
      .fn()
      .mockImplementation((student) =>
        Promise.resolve({ id: 12122221, ...student }),
      ),
    delete: jest.fn().mockImplementation(),
    remove:jest.fn().mockImplementation(),
    find:jest.fn().mockImplementation(()=>Promise.resolve([{id:"",name:'',email:'',dob:''}])),
    findOne:jest.fn().mockImplementation((id)=>Promise.resolve({id:id,name:'',email:'',dob:''}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create student', () => {
    expect(
      service.createStudent({
        name: 'mahi',
        email: '',
        dob: '',
      }),
    ).toBeTruthy();
  });

  it('should update student', () => {
    expect(
      service.update({
        name: 'mahi',
        email: '',
        dob: '',
        id: '',
      }),
    ).toBeTruthy();
  });

  it('should delete student', () => {
    expect(service.delete('1')).toBeTruthy();
  });

  it('should get one student', () => {
    expect(service.getOne('1')).toBeTruthy();
  });

  it('should get all student', () => {
    expect(service.getAll()).toBeTruthy();
  });
});
