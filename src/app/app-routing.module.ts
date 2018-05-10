import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProListComponent }  from './pro-list/pro-list.component';
import { HomeComponent }  from './home/home.component';

const routes: Routes = [
  { path: 'pro-list', component: ProListComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
