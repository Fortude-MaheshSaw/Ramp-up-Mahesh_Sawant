import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { ADD_STUDENT } from '../graphql/graphql.queries';
import { ApolloService } from '../student.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css'],
})
export class AddRecordComponent implements OnInit {
  constructor(private studentService: ApolloService,private toastr:ToastrService) {}

  ngOnInit(): void {}

  disabledDates = (date: Date): boolean => {
    return date > new Date();
  };

  async addRecord(name: any, email: any, dob: any) {
    let stud = {
      name: name,
      email: email,
      dob: dob,
    };

    (await this.studentService.addRecord(stud)).subscribe((res)=>{
      this.toastr.success('Record added successfully...');
    });
  }
}
