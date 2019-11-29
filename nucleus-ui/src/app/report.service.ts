import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  reports: Array<any> = [];
  reportStream = new Subject();
  reportLastIdx = 0;
  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}
  reportItem;
  reportItemStream = new Subject();

  getReports() {
    return this.reports;
  }

  togglePrivilege(flag,username){
    let apiUrl = `http://localhost:7000/nucleus_core/v1/report/privilege/${username}/${flag}`
    this._http.post(apiUrl,this.getReportItem().report_id).subscribe((e:any)=>{
      console.log(e)
    })
  }

  getReportStream() {
    return this.reportStream;
  }

  addReportItem(reportItem) {
    this.reportItem = reportItem;
    this.reportItemStream.next({ reportItem: this.reportItem });
  }

  getReportItemStream() {
    return this.reportItemStream;
  }

  getReportItem(){
    return this.reportItem
  }

  saveReportData(reportRequest) {
    let apiUrl = "http://localhost:7000/nucleus_core/v1/report/store_report";
    console.log(this.userService.getUserId())
    this._http.post(apiUrl, reportRequest).subscribe((e: any) => {
      if (e!=null) {
          let report = e
          this.reportLastIdx = report.report_id
          // if(this.reports.length!=0 && this.reports != undefined &&this.reports!=null){
          //   this.reports[this.reports.length - 1].report_id + 1
          // }else{
          //   reportRequest["report_id"] = 1
          // }
        this.reports.push(report);
        console.log("new report id!")
        console.log(report.report_id)
        this.reportStream.next({ reports: this.reports });
      }
    });
  }

  getReportData() {
    let apiUrl = `http://localhost:7000/nucleus_core/v1/report/get_reports`;
    return this._http.post(apiUrl, this.userService.getUserId());
  }

  getReportQueryResults(connection, source) {
    let apiUrl =
      source === "jdbc"
        ? "http://localhost:7001/sql/v1/execute_query"
        : "http://localhost:7002/rest/v1/execute_query";
    return this._http.post(apiUrl, connection);
  }

  deleteReport() {
    let apiUrl = `http://localhost:7000/nucleus_core/v1/report/delete_report/${this.userService.getUserId()}`;
    console.log(this.reportItem)
    this._http.post(apiUrl, this.reportItem.report_id).subscribe(
      (e:any) => {
        console.log(e)
        this.reports = e;
        this.reportStream.next({reports:this.reports})
        this.router.navigate(["data_source"])
      },
      error => {return "error"}
    );
  }
}

/*
let idx;
    for (let i = 0; i < this.reports.length; i++) {
      if ((this.reports[i] = report[i])) {
        idx = i;
        break;
      }
    }

    this.reports.splice(idx, 1);
*/
