import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort'
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DataSourceComponent } from './data-source/data-source.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DataSourceFormComponent } from './data-source-form/data-source-form.component';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataSourceItemComponent } from './data-source-item/data-source-item.component'
import {AccordionModule} from 'primeng/accordion';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import {SelectButtonModule} from 'primeng/selectbutton';
import { QueryFormComponent } from './query-form/query-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportItemComponent } from './report-item/report-item.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { GridsterModule } from 'angular-gridster2';
import { ChartsModule } from 'ng2-charts';
import { GridItemComponent } from './grid-item/grid-item.component';
import { LoginComponent } from './login/login.component';
import {MatRadioModule} from '@angular/material/radio';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { EndUserHomeComponent } from './end-user-home/end-user-home.component';
import {TooltipModule} from 'primeng/tooltip';

import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DataSourceComponent,
    NavbarComponent,
    SideMenuComponent,
    DataSourceFormComponent,
    DataSourceListComponent,
    DataSourceItemComponent,
    QueryFormComponent,
    ReportListComponent,
    ReportItemComponent,
    DashboardListComponent,
    DashboardItemComponent,
    GridItemComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    EndUserHomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    TreeModule,
    CheckboxModule,
    FormsModule,
    SelectButtonModule,
    GridsterModule,
    ChartsModule,
    MatRadioModule,
    SplitButtonModule,
    TooltipModule,
    ToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },MessageService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
