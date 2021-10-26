import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbButtonModule, NbListModule, NbCardModule, NbInputModule, NbMenuModule, NbAccordionModule, NbDialogModule, NbToastrService, NbToastrModule, NbSpinnerModule, NbButtonGroupModule, NbDatepickerModule, NbFormFieldModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';
import { PatronListitemComponent } from './feature/patron/patron-search/patron-listitem/patron-listitem.component';
import { PatronService } from './service/patron.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatronDetailsComponent } from './feature/patron/patron-details/patron-details.component';
import { PatronManageComponent } from './feature/patron/patron-manage/patron-manage.component';
import { GenericTableComponent } from './component/generic-table/generic-table.component';
import { PatronManageTableComponent } from './feature/patron/patron-manage/patron-manage-table/patron-manage-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PatronManageCreationComponent } from './feature/patron/patron-manage/patron-manage-creation/patron-manage-creation.component';
import { GenericDialogDeleteComponent } from './component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ToastService } from './service/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GenericDialogCancelComponent } from './component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GenericSpinnerComponent } from './component/generic-spinner/generic-spinner.component';
import { GenericInputComponent } from './component/generic-input/generic-input.component';
import { GenericDatepickerRangeComponent } from './component/generic-datepicker-range/generic-datepicker-range.component';
import * as moment from 'moment';
import { NbMomentDateModule } from '@nebular/moment';
import { LoginComponent } from './feature/login/login.component';
import { GenericInputPasswordComponent } from './component/generic-input-password/generic-input-password.component';
import { ApiPetitionsInterceptor } from './interceptor/api-petitions.interceptor';
import { NoPermisionComponent } from './feature/no-permision/no-permision.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PatronSearchComponent,
    PatronListitemComponent,
    PatronDetailsComponent,
    PatronManageComponent,
    PatronManageTableComponent,
    GenericTableComponent,
    PatronManageCreationComponent,
    GenericDialogDeleteComponent,
    GenericDialogCancelComponent,
    GenericSpinnerComponent,
    GenericInputComponent,
    GenericDatepickerRangeComponent,
    LoginComponent,
    GenericInputPasswordComponent,
    NoPermisionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbCardModule,
    NbInputModule,
    NbMenuModule.forRoot(),
    HttpClientModule,
    NbAccordionModule,
    NgxDatatableModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularEditorModule,
    NbSpinnerModule,
    NbButtonGroupModule,
    NbDatepickerModule.forRoot(),
    NbMomentDateModule,
    NbFormFieldModule
  ],
  providers: [
    PatronService,
    NbToastrService,
    ToastService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiPetitionsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
