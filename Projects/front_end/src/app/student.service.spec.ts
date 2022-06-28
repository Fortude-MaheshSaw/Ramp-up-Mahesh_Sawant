import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Apollo, ApolloModule } from 'apollo-angular';
import { createApollo, GraphQLModule } from './graphql.module';
import { STUDENT_LIST } from './graphql/graphql.queries';
import { ApolloService } from './student.service';

describe('StudentService', () => {
  let service: ApolloService;
  let ApolloMock: any;

  beforeEach(() => {
    ApolloMock=jasmine.createSpyObj('Apollo',['watchQuery','mutate'])
    ApolloMock.watchQuery.and.returnValue({valueChange:{}})
    
    
    TestBed.configureTestingModule({
      imports: [],
      providers: [{provide:Apollo,useValue:ApolloMock}],
    });
    service = TestBed.inject(ApolloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchRecord', () => {
    service.fetchRecord();
    expect(service.fetchRecord).toBeTruthy();
  });

  it('addRecord', () => {
    service.addRecord({name:'a',email:'a@s.co',dob:'1/03/1996'});
    expect(service.addRecord).toBeTruthy();
  });

  it('deleteRecord', () => {
    service.deleteRecord('1hd3bhj4b');
    expect(service.deleteRecord).toBeTruthy();
  });

  it('getQuery', () => {
    service.getQuery();
    expect(service.getQuery).toBeTruthy();
  }); 
});
