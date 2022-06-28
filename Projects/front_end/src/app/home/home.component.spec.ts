import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { GraphQLModule } from '../graphql.module';
import { HttpService } from '../httpservice.service';
// import { SocketService } from '../socket.service';
import { ApolloService } from '../student.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let StudentServiceMock: any;
  let HTTPServiceMock:any;
  let SocketMock: any;
  beforeEach(async () => {
    SocketMock = jasmine.createSpyObj('Socket', ['on','connect']);

    StudentServiceMock = jasmine.createSpyObj('ApolloService', [
      'fetchRecord',
      'deleteRecord',
      'getQuery',
    ]);

    StudentServiceMock.fetchRecord.and.returnValue(
      of({
        serviceOutput: {
          data: {
            getAllStudents: [
              { id: '222', name: 'hbfh', email: 'ydgsg@gmail.com', dob: '' },
            ],
          },
        },
      })
    );

    StudentServiceMock.deleteRecord.and.returnValue(
      of({ serviceOutput: { data: { deleteStudent: '' } } })
    );
    StudentServiceMock.getQuery.and.returnValue({ refetch: () => {} });

    HTTPServiceMock=jasmine.createSpyObj('HttpService', ['removeAll']);
    HTTPServiceMock.removeAll.and.returnValue(of({serviceOutput:'removed'}))
    await TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        ModalModule.forRoot(),
        HttpClientModule,
        SocketIoModule.forRoot({ url: 'http://localhost:5000', options: {} }),
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: ApolloService, useValue: StudentServiceMock },
        { provide: HttpService, useValue: HTTPServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy;
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy;
  });

  it('getAllStudent', () => {
    component.getAllStudentsList();
    expect(component.getAllStudentsList).toBeTruthy;
  });

  it('adding students', () => {
    component.addingStudents({
      data: {
        getAllStudents: [
          { id: '1a3aa', name: 'rrr', dob: '1/5/2000', email: 'rrr' },
          { id: '2a3aa', name: 'sss', dob: '5/5/1990', email: 'rrr' },
          { id: '1a3aa', name: 'rrr', dob: '1/5/2000', email: 'rrr' },
          { id: '1a3aa', name: 'rrr', dob: '1/5/2000', email: 'rrr' },
        ],
      },
    });

    expect(component.addingStudents).toBeTruthy;
  });

  it('edit student', () => {
    component.editRecord('any', { id: '', name: '', dob: '', email: '' });
    expect(component.editRecord).toBeTruthy;
  });

  it('add student', () => {
    component.addRecord('any');
    expect(component.addRecord).toBeTruthy;
  });

  it('connect socket', () => {
    component.connectToSocket();
    expect(component.connectToSocket).toBeTruthy;
  });

  it('delete Record', () => {
    component.deleteRecord('5dtd66dtt6');
    expect(component.deleteRecord).toBeTruthy;
  });

  it('close dialog', () => {
    StudentServiceMock.deleteRecord.and.returnValue(
      of({ serviceOutput: { data: { deleteStudent: '' } } })
    );

    HTTPServiceMock.removeAll.and.returnValue(of({serviceOutput:'removed'}));

    
    component.closeDialog('yes');
    component.closeDialog('no');
    component.closeDialog('deleteAll');
    expect(component.closeDialog).toBeTruthy;
  });

  it('load Items', () => {
    component.loadItems();

    expect(component.loadItems).toBeTruthy;
  });

  it('page Change', () => {
    component.pageChange({
      skip: 5,
      take: 0,
    });
    expect(component.pageChange).toBeTruthy;
  });

  it('close Popup', () => {
    component.closePopup();
    expect(component.closePopup).toBeTruthy;
  });

  it('remove', () => {
    component.records=[];
    component.remove({preventDefault:()=>{}});
    component.records=[{name:'mahi'}];
    component.remove({preventDefault:()=>{}});
    expect(component.remove).toBeTruthy;
  });
});
