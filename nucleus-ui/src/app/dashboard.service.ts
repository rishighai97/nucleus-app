import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { GridsterItem } from 'angular-gridster2';
import { ConstantPool } from '@angular/compiler';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboards=[]
  grid: Array<GridsterItem> = [];
  selectedDashboard
  dashboardLastIdx
  charts = [];
  components
  dashboardStream = new Subject()
  constructor(private _http:HttpClient,private router:Router,private userService:UserService) { }
  dashboardItem
  dashboardItemStream = new Subject()
  gridStream = new Subject()

  getDashboards(){
    return this.dashboards
  }

  getSelectedDashboard(){
    return this.selectedDashboard
  }

  getDashboardStream(){
    return this.dashboardStream
  }

  getGridStream(){
    return this.gridStream
  }

  togglePrivilege(flag,username){
    let apiUrl = `http://localhost:7000/nucleus_core/v1/dashboard/privilege/${username}/${flag}`
    this._http.post(apiUrl,this.getSelectedDashboard().dashboard_id).subscribe((e:any)=>{
      console.log(e)
    })
  }


  addGrids(grids){
    this.charts = grids.charts
    this.grid = grids.grid
    this.components = grids.components
    this.gridStream.next({'grid':this.grid,'charts':this.charts,'components':this.components})
    this.router.navigate(["component"])
  }

  addDashboardItem(dashboardItem){
    this.dashboardItem = dashboardItem
    this.dashboardItemStream.next({dashboardItem:this.dashboardItem})
    this.router.navigate(["dashboard"])
  }

  getDashboardItemStream(){
    return this.dashboardItemStream
  }

  saveDashboardData(dashboardRequest){
    console.log(dashboardRequest)
    let apiUrl="http://localhost:7000/nucleus_core/v1/dashboard/store_dashboard"
    console.log(dashboardRequest)
    this._http.post(apiUrl,dashboardRequest).subscribe((e:any)=>{
      console.log(e)
      if(e!=null){
        let found = false

        let dashboard=e
        this.dashboardLastIdx = dashboard.report_id
        let idx=-1
        for(let i=0;i<this.dashboards.length;i++){
          if(this.dashboards[i].dashboard_id===dashboard.dashboard_id){
            idx = i
            break
          }
        }
        if(idx!=-1){
          this.dashboards[idx] = dashboard
        }else{
          this.dashboards.push(dashboard)
        }
        console.log(this.dashboards)
        this.dashboardStream.next({dashboards:this.dashboards})
        
      }
      
    })
  }

  deleteDashboard(){
    let apiUrl = `http://localhost:7000/nucleus_core/v1/dashboard/delete_dashboard/${this.userService.getUserId()}`;
    //console.log(this.selectedDashboard)
    this._http.post(apiUrl, this.selectedDashboard.dashboard_id).subscribe(
      (e:any) => {
        console.log(e)
        this.dashboards = e;
        this.dashboardStream.next({dashboards:this.dashboards})
        this.router.navigate(["data_source"])
      },
      error => {console.log("error")}
    );
  }

  getDashboardData(){
    let apiUrl="http://localhost:7000/nucleus_core/v1/dashboard/get_dashboards"
    return this._http.post(apiUrl,this.userService.getUserId())
  }

  getDashboardQueryResults(connection,source) {
    let apiUrl = source==="jdbc"?"http://localhost:7001/sql/v1/dashboard/execute_query":"http://localhost:7002/rest/v1/dashboard/execute_query";
    return this._http.post(apiUrl, connection);
  }
}
