import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutersComponent } from './routers.component';

const routes: Routes = [
  { path: '', component: RoutersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutersRoutingModule { }
