import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';

const routes: Routes = [
  { path: 'patron/buscador', component: PatronSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
