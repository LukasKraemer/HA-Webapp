import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TablesComponent } from './tables/tables.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ChartsModule } from 'ng2-charts';
import { PythonComponent } from './python/python.component';
import { FooterComponent } from './footer/footer.component';
import { PermissionErrorComponent } from './permission-error/permission-error.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    LoginFormComponent,
    TablesComponent,
    HomeComponent,
    AdminComponent,
    PythonComponent,
    FooterComponent,
    PermissionErrorComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ChartsModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
