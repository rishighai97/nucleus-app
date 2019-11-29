import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSourceService } from '../data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { DashboardService } from '../dashboard.service';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit {
  selectedConnections={}
  queryForm:FormGroup
  dashboardForm:FormGroup
  reportForm:FormGroup
  type:string="report"
  conn_type='jdbc'
  constructor(private dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
    private reportService:ReportService,
    private dashboardService:DashboardService,
    private userService:UserService,
    private messageService: MessageService
     ) {}

  ngOnInit() {
    this.queryForm=this.fb.group({
      'query':['',Validators.required]
    })

    this.reportForm=this.fb.group({
      'report_name':['',Validators.required]
    })

    this.dashboardForm=this.fb.group({
      'dashboard_name':['',Validators.required],
      'x_label':['',Validators.required],
      'chart_type':['',Validators.required]
    })

    this.dataSourceService.getSelectedConnectionStream().subscribe(e=>{
      
      this.selectedConnections=e
      let getUndefined = Object.keys(this.selectedConnections)
      let connsWithKeys = this.selectedConnections[getUndefined[0]]
      let keys=Object.keys(connsWithKeys)  
      let conn= connsWithKeys[keys[0]]
      if(conn!=null && conn!=[] && conn!=undefined){
      this.conn_type=conn.type
      
      }
    })

  }

  getType(type:string){
    this.type=type
  }

  handleQuerySubmit(event){
    event.preventDefault()
    if(this.queryForm.valid){
      let getUndefined = Object.keys(this.selectedConnections)
      let connsWithKeys = this.selectedConnections[getUndefined[0]]
      let keys=Object.keys(connsWithKeys)  
      let conn= connsWithKeys[keys[0]]
      let query=this.queryForm.get("query").value
      if(this.type=='report'){
        let reportRequest = {}
        reportRequest["user_id"]=this.userService.getUserId()
        reportRequest["report_name"]=this.reportForm.get("report_name").value
        reportRequest["query"]=query
        reportRequest["connection"]=conn
        this.reportService.saveReportData(reportRequest)
        this.reportForm.reset()
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Report Added successfully'})
      }else{
        if(this.dashboardForm.valid){
          let dashboardRequest={}
          dashboardRequest["chart_type"]=this.dashboardForm.get("chart_type").value
          dashboardRequest["dashboard_name"]=this.dashboardForm.get("dashboard_name").value
          dashboardRequest["x_label"]=this.dashboardForm.get("x_label").value
          dashboardRequest["query"]=query
          dashboardRequest["user_id"]=this.userService.getUserId()
          dashboardRequest["connection"]=conn
          this.dashboardService.saveDashboardData(dashboardRequest)
          this.dashboardForm.reset()
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Dashboard component added successfully'})
        }
      }
      /* 
      {
  "chart_type": "pie",
  "connection": {
    "data_source_name": "eat_it",
    "database_name": "mysql",
    "id": 1,
    "password": "rishi",
    "type": "jdbc",
    "url": "jdbc:mysql://localhost:3306/eat_it",
    "username": "root"
  },
  "dashboard_name": "item dashboard",
  "query": "select name,price from items",
  "user_id": 1,
  "x_label": "name"
}
      */
    }else{
    }
  }

}


/*
 let getUndefined = Object.keys(this.selectedConnections)
      
      let connections=[]
      let connsWithKeys = this.selectedConnections[getUndefined[0]]
      let keys=Object.keys(connsWithKeys)
for(let key=0;key<keys.length;key++){
        connections.push(connsWithKeys[keys[key]])
      }
connsWithKeys[keys[0]]["query"]=this.queryForm.get("query").value
      connsWithKeys[keys[0]][""]
      if(this.type=='dashboard'){
        if(this.dashboardForm.valid){
          connsWithKeys[keys[0]]["dashboard_name"]=this.dashboardForm.get("dashboard_name").value
          connsWithKeys[keys[0]]["x_label"]=this.dashboardForm.get("x_label").value
          connsWithKeys[keys[0]]["chart_type"]=this.dashboardForm.get("chart_type").value
        }
      }else{
        connsWithKeys[keys[0]]["report_name"]=this.reportForm.get("report_name").value
        this.reportService
      }

*/