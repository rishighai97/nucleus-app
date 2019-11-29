import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter  } from '@angular/core';
import { DataSourceService } from '../data-source.service';
import { TreeNode } from 'primeng/components/common/treenode';

@Component({
  selector: 'app-data-source-item',
  templateUrl: './data-source-item.component.html',
  styleUrls: ['./data-source-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataSourceItemComponent implements OnInit {
  @Input() connection;
  tables=[]
  columns=[]
  data:TreeNode[];
  value: boolean;
  @Output() connect = new EventEmitter()
  constructor(private dataSourceService : DataSourceService) { }

  ngOnInit() {
    if(this.connection.type==='jdbc'){
      
      this.dataSourceService.getTablesForConnection(this.connection).subscribe((response:any)=>{
        this.tables = Object.keys(response)
        this.data = []
        for(let table of this.tables){
              let children=[]
              for(let column of response[table]){
                children.push({label:column,"collapsedIcon": "pi pi-angle-right","expandedIcon":"pi pi-angle-right"})
              }
              this.data.push({label:table,children,"collapsedIcon": "pi pi-table","expandedIcon":"pi pi-table"})
        }
      })
    }

  }

 addConnection(){
    this.connect.emit({connection:this.connection,condition:this.value})
  }

}
