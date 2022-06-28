/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentDTO {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  dob: string;
}
