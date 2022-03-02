import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ChartsComponent } from './charts/charts.component';
import {HomeComponent} from './home/home.component';
import {PythonComponent} from './python/python.component';
import {PermissionErrorComponent} from './permission-error/permission-error.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'chart', component: ChartsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'app', component: PythonComponent},
  { path: 'error', component: PermissionErrorComponent},
  { path: 'error/:error', component: PermissionErrorComponent},
  { path: '', component: HomeComponent},
  { path: ':error', redirectTo: 'error/notFounded', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
