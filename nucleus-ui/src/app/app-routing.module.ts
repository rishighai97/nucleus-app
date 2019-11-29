import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataSourceComponent } from "./data-source/data-source.component";
import { DataSourceFormComponent } from "./data-source-form/data-source-form.component";
import { DataSourceListComponent } from "./data-source-list/data-source-list.component";
import { TableComponent } from "./table/table.component";
import { GetDataResolverService } from "./get-data-resolver.service";
import { ReportItemComponent } from "./report-item/report-item.component";
import { ReportItemResolverService } from "./report-item-resolver.service";
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";
import { GridItemComponent } from "./grid-item/grid-item.component";
import { GridItemResolverService } from "./grid-item-resolver.service";
import { NeedAuthGuardService } from './need-auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EndUserHomeComponent } from './end-user-home/end-user-home.component';


const routes: Routes = [
  {path:"end_user_home",component:EndUserHomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "", component: DataSourceComponent,canActivate: [NeedAuthGuardService]},
  {path:"home", component: HomeComponent},
  {path: "report",component: ReportItemComponent,canActivate: [NeedAuthGuardService] },
  { path: "reportRedirect", redirectTo: "report", pathMatch: "full",canActivate: [NeedAuthGuardService]  },
  { path: "dashboard", component: DashboardItemComponent ,canActivate: [NeedAuthGuardService] },
  {path: "component",component: GridItemComponent,
  // resolve:{
  //   gridData:GridItemResolverService
  // }
  canActivate: [NeedAuthGuardService] 
},
  {
    path: "data_source",
    component: DataSourceComponent,
    canActivate: [NeedAuthGuardService],
    children: [
      {
        path: "data_source_form",
        component: DataSourceFormComponent
      },
      {
        path: "data_source_list",
        component: DataSourceListComponent
      },
      { path: "report_redirect", component: TableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
