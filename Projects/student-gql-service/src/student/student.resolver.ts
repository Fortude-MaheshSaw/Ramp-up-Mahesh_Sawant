import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateStudentDTO } from './dto/create-student.input';
import { UpdateStudentDTO } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student], { name: 'getAllStudents' })
  getAll() {
    return this.studentService.getAll();
  }

  @Query(() => Student)
  getOne(@Args('id') id: string) {
    return this.studentService.getOne(id);
  }

  @Mutation(() => String, { name: 'createStudent' })
  async create(@Args('studentInput') student: CreateStudentDTO) {
    return this.studentService.createStudent(student);
  }

  @Mutation(() => String, { name: 'deleteStudent' })
  async delete(@Args('id') id: string) {
    return this.studentService.delete(id);
  }

  @Mutation(() => String, { name: 'updateStudent' })
  async update(@Args('updatedStudentInput') student: UpdateStudentDTO) {
    return this.studentService.update(student);
  }
}
