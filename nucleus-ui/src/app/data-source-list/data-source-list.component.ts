import { Component, OnInit, Input } from '@angular/core';
import { DataSourceService } from '../data-source.service';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-data-source-list',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.css']
})
export class DataSourceListComponent implements OnInit {
  @Input() connections=[]
  selectedConnections={}
  queryForm:FormGroup
  constructor(private dataSourceService: DataSourceService,private route: ActivatedRoute,private fb:FormBuilder, private router:Router) {}

  

  ngOnInit() {
  
    this.queryForm=this.fb.group({
      'query':['',Validators.required]
    })
  }

  // check which connections are selected or deleted in data source item and update in memory array in service
  handleSelectedConnections(event){
    let {connection,condition} = event

    if(condition){
      this.selectedConnections[connection.id]=connection
    }else{
      delete this.selectedConnections[connection.id]
    }
    this.dataSourceService.addSelectedConnection(this.selectedConnections)
  }

}
