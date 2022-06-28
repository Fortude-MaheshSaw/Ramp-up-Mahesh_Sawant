import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  STUDENT_LIST,
} from './graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  

  constructor(private apollo: Apollo) {}

  async addRecord(stud: any) {
    return await this.apollo.mutate({
      mutation: ADD_STUDENT,
      variables: { student: stud },
    });
  }

  getQuery(){
    return this.apollo.watchQuery({ query: STUDENT_LIST });
  }
    
  fetchRecord() {
    return this.getQuery().valueChanges;
  }

  async deleteRecord(studId: any) {
    return await this.apollo.mutate({
      mutation: DELETE_STUDENT,
      variables: { studId: studId },
    });
  }
}
