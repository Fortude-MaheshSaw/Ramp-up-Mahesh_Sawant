
import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/student';
import { HttpService } from '../httpservice.service';
import { ApolloService } from '../student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  records: any = [];
  skip = 0;
  gridView: GridDataResult = {
    data: [],
    total: 0,
  };
  pageSize = 5;
  selectedRecordId: any;
  isSelected: boolean = false;
  dataList: any = [];
  modalRef: BsModalRef | undefined;
  student: Student = {
    id: '',
    name: '',
    email: '',
    dob: '',
  };
  config = {
    animated: true,
    ignoreBackdropClick: true,
    class: 'alert alert-danger',
  };

  uploadSaveUrl = 'http://localhost:5000/student/upload';
  removeUrl='http://localhost:5000/student/remove'
  opened: boolean = false;
  openConfirmation: boolean = false;
  studId: any;
  show: boolean = false;
  myRestrictions: FileRestrictions = {
    allowedExtensions: ['xlsx'],
  };
  myFiles = [];

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private socket: Socket,
    private service: HttpService,
    private apolloService: ApolloService
  ) {}

  ngOnInit(): void {
    this.connectToSocket();
    this.getAllStudentsList();
  }



  async getAllStudentsList() {
    this.records = [];
    await this.apolloService.fetchRecord().subscribe(async (result: any) => {
      this.records = [];
      await this.addingStudents(result);
      await this.loadItems();
    });
  }

  async addingStudents(result: any) {
    for (let i = 0; i < result?.data?.getAllStudents?.length; i++) {
      let age: any = '';
      let dob: any;
      if (result.data.getAllStudents[i].dob) {
        dob = new Date(result.data.getAllStudents[i].dob);
        var timeDiff = Math.abs(Date.now() - dob);
        age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      }
      let stud = {
        id: result.data.getAllStudents[i].id,
        name: result.data.getAllStudents[i].name,
        email: result.data.getAllStudents[i].email,
        dob: dob,
        age: age,
      };
      await this.records.push(stud);
    }
    this.records.sort((a: any, b: any) => {
      let fa = a.id.toLowerCase();
      let fb = b.id.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }


  async connectToSocket() {
    await this.socket.connect();
    this.socket.on('jobStatus', async (res: any) => {
      if (res == 'success') {
        await this.apolloService.getQuery().refetch();
        this.toastr.success('File uploaded successfully');
      } else if (res == 'failed') {
        this.toastr.error('Something went wrong. Unable to extract this file.');
      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: this.records.slice(this.skip, this.skip + this.pageSize),
      total: this.records.length,
    };
  }

  addRecord(popUpAdd: any) {
    this.modalRef = this.modalService.show(popUpAdd, this.config);
  }

  editRecord(popUp: any, stud: any) {
    this.student = {
      id: stud.id,
      name: stud.name,
      email: stud.email,
      dob: stud.dob,
    };
    this.modalRef = this.modalService.show(popUp, this.config);
  }

  deleteRecord(stud: any) {
    this.studId = stud.id;
    this.opened = true;
  }

  closePopup() {
    this.modalRef?.hide();
    this.apolloService.getQuery().refetch();
  }

  async closeDialog(res: string) {
    if (res == 'yes') {
      (await this.apolloService.deleteRecord(this.studId)).subscribe(
        async (data) => {
          await this.apolloService.getQuery().refetch();
          this.opened = false;
          this.toastr.success('Record Deleted Successfully...');
        }
      );
    } else if (res == 'deleteAll') {
      this.service.removeAll().subscribe(async (res) => {
        this.openConfirmation = false;
        
        await this.apolloService.getQuery().refetch();
        this.toastr.success(
          'File and records related to the file removed successfully'
        );
      });
      this.openConfirmation = false;
      this.myFiles = [];
      return;
    }
    this.opened = false;
    this.openConfirmation = false;
  }

  remove(event:any){
    event.preventDefault();
    if(this.records.length>0){
      
    this.openConfirmation=true;
    }
    else{
      this.myFiles=[];
    }
  }
}
