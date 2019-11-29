import { Component, OnInit, Input } from "@angular/core";
import { TreeNode } from "primeng/components/common/treenode";
import { Router } from "@angular/router";
import { DashboardService } from "../dashboard.service";
import { GridsterItem, GridsterConfig } from "angular-gridster2";
@Component({
  selector: "app-dashboard-list",
  templateUrl: "./dashboard-list.component.html",
  styleUrls: ["./dashboard-list.component.css"]
})
export class DashboardListComponent implements OnInit {
  dashboards;
  dashboard_names: TreeNode[];
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.dashboards = this.dashboardService.getDashboards()
    this.dashboardService.getDashboardStream().subscribe((e:any)=>{
      console.log(e)
      this.dashboards = e.dashboards
      this.dashboard_names=[]
      for(let dashboard of this.dashboards){
        this.dashboard_names.push({label:dashboard["dashboard_name"],"data":dashboard,"collapsedIcon": "fa fa-bar-chart"})
      }
    })
    this.dashboardService.getDashboardData().subscribe((e: any) => {
      this.dashboards = e;
      this.dashboardService.dashboards = e;
      this.dashboard_names = [];
      for (let dashboard of this.dashboards) {
        this.dashboard_names.push({
          label: dashboard["dashboard_name"],
          data: dashboard,
          collapsedIcon: "pi pi-table"
        });
      }
      console.log(this.dashboards);
    });
  }

  handleNodeSelect(event: any) {
    //this.reportService.reportItem=event.node.data
    let dashboard = event.node.data;
    this.dashboardService.selectedDashboard = event.node.data
    console.log(this.dashboardService.selectedDashboard)
    let grid: Array<GridsterItem> = [];
    let charts = [];

    let option = {
      responsive: true,
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        xAxes: [{ display: true }],
        yAxes: [
          {
            display: true
          }
        ]
      }
    };
    for (let component of dashboard["components"]) {
      component.connection["query"] = component.query;
      this.dashboardService
        .getDashboardQueryResults(
          component.connection,
          component.connection.type
        )
        .subscribe((response: any) => {
          let chart = {};
          let data: Array<any> = [];
          for (let item of response) {
            if (item["label"] === component.x_label) {
              chart["labels"] = item["data"];
            } else {
              data.push(item);
            }
          }
          grid.push({ cols: 1, rows: 1, y: 0, x: 0 });
          chart["data"] = data;
          chart["options"] = option
          chart["type"] = component.chart_type;
          charts.push(chart);
          //options grid charts
          let grids = {
            grid: grid,
            charts: charts,
            components:dashboard["components"],
            selectedDashboard:event.node.data
          };
          this.dashboardService.addGrids(grids)
        });
        
        console.log("call me")
    }
    //this.dashboardService.addDashboardItem(event.node.data)
  }

  static itemChange(item, itemComponent) {
    console.info("itemChanged", item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info("itemResized", item, itemComponent);
  }

}
