import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbButtonModule, NbListModule, NbCardModule, NbInputModule, NbMenuModule, NbAccordionModule, NbDialogModule, NbToastrService, NbToastrModule, NbSpinnerModule, NbButtonGroupModule, NbDatepickerModule, NbFormFieldModule, NbContextMenuModule, NbUserModule, NbAutocompleteModule, NbTooltipModule } from '@nebular/theme';
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
import { LogoutComponent } from './feature/logout/logout.component';
import { UsuarioDetailsComponent } from './feature/usuario/usuario-details/usuario-details.component';
import { DialogPasswordChangeComponent } from './component/generic-dialog/dialog-password-change/dialog-password-change.component';
import { GrupoManageComponent } from './feature/grupo/grupo-manage/grupo-manage.component';
import { GrupoManageTableComponent } from './feature/grupo/grupo-manage/grupo-manage-table/grupo-manage-table.component';
import { GrupoManageCreationComponent } from './feature/grupo/grupo-manage/grupo-manage-creation/grupo-manage-creation.component';
import { GenericAutocompleteComponent } from './component/generic-autocomplete/generic-autocomplete.component';
import { GenericDialogComponent } from './component/generic-dialog/generic-dialog.component';
import { UserDialogCreateComponent } from './feature/usuario/user-dialog/user-dialog-create/user-dialog-create.component';
import { UserDialogImportComponent } from './feature/usuario/user-dialog/user-dialog-import/user-dialog-import.component';
import { UserDialogResetPasswordComponent } from './feature/usuario/user-dialog/user-dialog-reset-password/user-dialog-reset-password.component';

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
    LogoutComponent,
    UsuarioDetailsComponent,
    DialogPasswordChangeComponent,
    GrupoManageComponent,
    GrupoManageTableComponent,
    GrupoManageCreationComponent,
    GenericAutocompleteComponent,
    GenericDialogComponent,
    UserDialogCreateComponent,
    UserDialogImportComponent,
    UserDialogResetPasswordComponent,
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
    NbFormFieldModule,
    NbContextMenuModule,
    NbUserModule,
    NbAutocompleteModule,
    NbTooltipModule
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
