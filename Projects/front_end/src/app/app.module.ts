import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import {
  FileSelectModule,
  UploadsModule,
} from '@progress/kendo-angular-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GraphQLModule } from './graphql.module';
import { ToastrModule } from 'ngx-toastr';
import { LabelModule } from '@progress/kendo-angular-label';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ApolloService } from './student.service';
import { Apollo } from 'apollo-angular';
import { HttpService } from './httpservice.service';
// import { SocketService } from './socket.service';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddRecordComponent,
    EditRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    DateInputsModule,
    InputsModule,
    GridModule,
    UploadsModule,
    FileSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    GraphQLModule,
    ToastrModule.forRoot(),
    LabelModule,
    SocketIoModule.forRoot(config),
    DialogsModule,
    PopupModule,
  ],
  providers: [DatePipe, ApolloService, HttpService,
    // SocketService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
