import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { BaseChartDirective, ChartsModule } from "ng2-charts";

@Component({
  selector: "app-dashboard-item",
  templateUrl: "./dashboard-item.component.html",
  styleUrls: ["./dashboard-item.component.css"]
})
export class DashboardItemComponent implements OnInit {
  dashboard;
  grid: Array<GridsterItem>;
  // charts=[]
  // option = {
  //   responsive: true,
  //   scales: {
  //     // We use this empty structure as a placeholder for dynamic theming.
  //     xAxes: [{ display: true }],
  //     yAxes: [
  //       {
  //         display: true
  //       }
  //     ]
  //   }
  // };
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }
  static itemChange(item, itemComponent) {
    console.info("itemChanged", item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info("itemResized", item, itemComponent);
  }
  ngOnInit() {
    
    this.dashboardService.getDashboardItemStream().subscribe((e: any) => {
      
      console.log("in stream results")
      this.dashboard = e.dashboardItem;
      
      
      
    });
  }

  


}
