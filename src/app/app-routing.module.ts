import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatronDetailsComponent } from './feature/patron/patron-details/patron-details.component';
import { PatronManageComponent } from './feature/patron/patron-manage/patron-manage.component';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';

const routes: Routes = [
  { path: 'patron/buscador', component: PatronSearchComponent },
  { path: 'patron/detalles', component: PatronDetailsComponent },
  { path: 'patron/administracion', component: PatronManageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
