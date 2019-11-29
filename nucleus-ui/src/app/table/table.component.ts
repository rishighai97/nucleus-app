import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as XLSX from "xlsx";
import { DataSourceService } from "../data-source.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  displayedColumns = [];
  selectedConnections={}
  connectionKeys=[]
  dataSource: MatTableDataSource<any>;
  data: Array<any>;
  @ViewChild("TABLE", { static: true }) table: ElementRef;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataSourceService: DataSourceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.route.data.subscribe((response:any)=>{
      this.data = response.tableData;
      //console.log(this.data)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      Object.keys(this.data[0]).forEach(e => {
        this.displayedColumns.push(e);
      });
      this.dataSourceService.flushSelectedConnections();
    })
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet-1");
    XLSX.writeFile(wb, "SheetJS.xlsx");
  }

}
