import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbButtonModule, NbListModule, NbCardModule, NbInputModule, NbMenuModule, NbAccordionModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';
import { PatronListitemComponent } from './feature/patron/patron-search/patron-listitem/patron-listitem.component';
import { PatronService } from './service/patron.service';
import { HttpClientModule } from '@angular/common/http';
import { PatronDetailsComponent } from './feature/patron/patron-details/patron-details.component';
import { PatronManageComponent } from './feature/patron/patron-manage/patron-manage.component';
import { GenericTableComponent } from './component/generic-table/generic-table.component';
import { PatronManageTableComponent } from './feature/patron/patron-manage/patron-manage-table/patron-manage-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PatronSearchComponent,
    PatronListitemComponent,
    PatronDetailsComponent,
    PatronManageComponent,
    PatronManageTableComponent,
    GenericTableComponent
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
    NgxDatatableModule
  ],
  providers: [
    PatronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
