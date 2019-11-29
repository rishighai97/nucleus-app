import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSourceService } from '../data-source.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from "xlsx";
import { ReportService } from '../report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  data: Array<any>;
  displayedColumns = [];
  report
  formOpen=false
  private dashboardForm:FormGroup
  user_role
  @ViewChild("TABLE", { static: true }) table: ElementRef;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private reportService:ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private userService:UserService,
    private messageService: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }
  }

  onFormSubmit(operation){
    if(this.dashboardForm.valid){
      let message
      let username = this.dashboardForm.get("username").value
      if(operation==='add'){
        message = "Providing Read/Edit Privilege on this report to "+username
      }else{
        message = "Deleting Read/Edit Privilege on this report for "+username
      }
      this.messageService.add({severity: 'success',  detail: message})  
      setTimeout(()=>{
        this.reportService.togglePrivilege(operation,username)
      },2000)
      
    }
  }

  ngOnInit() {
    console.log(this.report)
    this.user_role=this.userService.getUserRole()
    // this.reportService.getReportItemStream().subscribe((e:any)=>{
    //    this.report = e.reportItem
    // })

    //form management
    this.dashboardForm = this.fb.group({
      username: ["", [Validators.required]],
    })
    


    let data = this.reportService.reportItem
    // conn, query, report_name
    data.connection.query=data.query
    this.reportService.getReportQueryResults(data.connection,data.connection.type).subscribe((e:any)=>{
      this.data = e
       console.log(this.data)
       this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      Object.keys(this.data[0]).forEach(e => {
        this.displayedColumns.push(e);
      });
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportAsExcel(event) {
    event.preventDefault()
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    this.messageService.add({severity: 'info',  detail: 'Exporting Report to excel'})  
    // setTimeout(()=>{
    //   this.reportService.deleteReport()
    // },2000)
    XLSX.utils.book_append_sheet(wb, ws, "Sheet-1");
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }

  deleteReport(){
    this.messageService.add({severity: 'warn',  detail: 'Deleting Report'})  
    setTimeout(()=>{
      this.reportService.deleteReport()
    },2000)

  }

  toggleFormStatus(){
    this.formOpen=!this.formOpen
  }

}


       //this.data.push(e.reportItem)
      //  this.dataSource = new MatTableDataSource(this.data);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      // Object.keys(this.data[0]).forEach(e => {
      //   this.displayedColumns.push(e);
      // });

          // this.route.data.subscribe((response:any)=>{
    //   this.data = response.reportData;

    //   this.dataSource = new MatTableDataSource(this.data);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   Object.keys(this.data[0]).forEach(e => {
    //     this.displayedColumns.push(e);
    //   });
    //  // console.log(this.data)
      
    // })