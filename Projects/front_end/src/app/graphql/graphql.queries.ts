import { gql } from 'apollo-angular';

const STUDENT_LIST = gql`
  query {
    getAllStudents {
      id
      name
      email
      dob
    }
  }
`;

const ADD_STUDENT = gql`
  mutation ($student: CreateStudentDTO!) {
    createStudent(studentInput: $student)
  }
`;

const DELETE_STUDENT = gql`
  mutation ($studId: String!) {
    deleteStudent(id: $studId)
  }
`;

const UPDATE_STUDENT = gql`
  mutation ($student: UpdateStudentDTO!) {
    updateStudent(updatedStudentInput: $student)
  }
`;

export { STUDENT_LIST, DELETE_STUDENT, UPDATE_STUDENT, ADD_STUDENT };
