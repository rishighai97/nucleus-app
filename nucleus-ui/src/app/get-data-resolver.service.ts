import { Injectable } from '@angular/core';
import { DataSourceService } from './data-source.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataResolverService {
  constructor(private dataSourceService : DataSourceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('resolving...')
    let selectedConnections={}
    let connectionKeys = []
   // this.dataSourceService.getConnectionStream().subscribe((response:any)=>{
      selectedConnections=this.dataSourceService.selectedConnections
      connectionKeys = Object.keys(selectedConnections);
   // })
    //console.log(selectedConnections)
    console.log(selectedConnections[connectionKeys[0]])
    return this.dataSourceService.getData(selectedConnections[connectionKeys[0]])
  }
}
