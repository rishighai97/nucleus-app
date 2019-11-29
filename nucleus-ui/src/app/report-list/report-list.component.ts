import { Component, OnInit, Input } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports
  report_names:TreeNode[]
  constructor(private reportService:ReportService,private router: Router,private userService:UserService) { 
    
  }


  handleNodeSelect(event:any){
    //this.reportService.reportItem=event.node.data
    this.reportService.addReportItem(event.node.data)
    this.router.navigate(["reportRedirect"])
  }

  ngOnInit() {
    //this.reports = this.reportService.getReports()
    this.reportService.getReportStream().subscribe((e:any)=>{
      this.reports = e.reports
      this.report_names=[]
      for(let report of this.reports){
        this.report_names.push({label:report["report_name"],"data":report,"collapsedIcon": "pi pi-table"})
      }
    })
    this.reportService.getReportData().subscribe((e:any)=>{
      console.log(e)
      this.reports=e
      this.reportService.reports=e
      this.report_names=[]
      for(let report of this.reports){
        this.report_names.push({label:report["report_name"],"data":report,"collapsedIcon": "pi pi-table"})
      }
    })
    
  
  }

}
