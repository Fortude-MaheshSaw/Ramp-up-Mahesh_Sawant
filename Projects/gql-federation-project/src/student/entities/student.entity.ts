/* eslint-disable prettier/prettier */

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()

@Entity()
export class Student {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  dob: string;
}
