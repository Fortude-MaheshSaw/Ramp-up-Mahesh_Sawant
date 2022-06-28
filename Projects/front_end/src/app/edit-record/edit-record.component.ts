import { Component, Input, OnInit } from '@angular/core';
import { FormatSettings } from '@progress/kendo-angular-dateinputs';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/student';
import { UPDATE_STUDENT } from '../graphql/graphql.queries';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css'],
})
export class EditRecordComponent implements OnInit {
  @Input() studObj: Student = {
    id: '',
    name: '',
    email: '',
    dob: '',
  };
  dateOfBirth: any;
  public format: FormatSettings = {
    displayFormat: 'dd/MM/yyyy',
    inputFormat: 'dd/MM/yy',
  };
  constructor(private apollo: Apollo, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dateOfBirth = new Date(this.studObj.dob);
  }

  disabledDates = (date: Date): boolean => {
    return date > new Date();
  };

  async updateStudent(name: any, email: any, dob: any) {
    let student = {
      id: this.studObj.id,
      name: name.value,
      email: email.value,
      dob: dob.value,
    };
    await this.apollo
      .mutate({
        mutation: UPDATE_STUDENT,
        variables: { student: student },
      })
      .subscribe((res: any) => {
        this.toastr.success('Record updated successfully...');
      });
  }
}
