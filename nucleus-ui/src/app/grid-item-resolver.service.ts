import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { DataSourceService } from './data-source.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridItemResolverService {

  constructor(private reportService:ReportService,private dataSourceService:DataSourceService) {
    
  }

 resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
   return this.reportService.getReportStream().subscribe
 }
}
