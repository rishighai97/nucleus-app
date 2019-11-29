import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSourceService } from './data-source.service';

@Injectable({
  providedIn: 'root'
})
export class ReportItemResolverService {

  constructor(private reportService:ReportService,private dataSourceService:DataSourceService) {
    
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let data = this.reportService.reportItem
    // conn, query, report_name
    data.connection.query=data.query
    return this.reportService.getReportQueryResults(data.connection,data.connection.type)
  }
}
