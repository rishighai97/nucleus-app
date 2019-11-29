import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { GridsterConfig, GridsterItem } from "angular-gridster2";
import { DashboardService } from "../dashboard.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardItemComponent } from "../dashboard-item/dashboard-item.component";
import { BaseChartDirective } from "ng2-charts";
import jspdf from "jspdf";
import domtoimage from "dom-to-image";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { MessageService } from "primeng/components/common/api";
@Component({
  selector: "app-grid-item",
  templateUrl: "./grid-item.component.html",
  styleUrls: ["./grid-item.component.css"]
})
export class GridItemComponent implements OnInit {
  formOpen = false;
  user_role;
  options: GridsterConfig = {
    itemChangeCallback: DashboardItemComponent.itemChange,
    itemResizeCallback: DashboardItemComponent.itemResize,
    gridType: "scrollVertical",
    setGridSize: true,
    margin: 0,
    pushItems: true,
    draggable: {
      enabled: true
    },
    resizable: {
      enabled: true
    }
  };
  grid: Array<GridsterItem> = [];
  charts;
  components;
  dashboardForm: FormGroup;
  dashboard;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {
    //   return false;
    // };
  }

  onFormSubmit(operation) {
    if (this.dashboardForm.valid) {



      let message
      let username = this.dashboardForm.get("username").value
      if(operation==='add'){
        message = "Providing Read/Edit Privilege on this dashboard to "+username
      }else{
        message = "Deleting Read/Edit Privilege on this dashboard for "+username
      }
      this.messageService.add({severity: 'success',  detail: message})  
      setTimeout(()=>{
        this.dashboardService.togglePrivilege(operation,username)
      },2000)
    }
  }

  ngOnInit() {
    console.log(this.userService.getUserRole());
    this.user_role = this.userService.getUserRole();

    //form management
    this.dashboardForm = this.fb.group({
      username: ["", [Validators.required]]
    });

    this.grid = this.dashboardService.grid;
    this.charts = this.dashboardService.charts;
    this.dashboardService.getGridStream().subscribe((e: any) => {
      this.grid = e.grid;
      this.charts = e.charts;
      this.components = e.components;
      this.dashboard = e.selectedDashboard;
    });
    // this.route.data.subscribe((e: any) => {
    //   let data = e.gridData;
    //   this.grid = data.grid;
    //   this.charts = data.charts;
    //   console.log(this.charts)
    // });
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  download(event) {
    var fbcanvas = document.getElementById("grid");
    this.messageService.add({
      severity: "info",
      detail: "Exporting Dashboard to PDF"
    });
    domtoimage.toPng(fbcanvas).then(dataUrl => {
      var img = new Image();
      img.src = dataUrl;
      var doc = new jspdf(1, "mm", "a4");

      doc.addImage(img, "PNG", 15, 60, 180, 150);
      doc.save("test.pdf");
    });
  }

  removeItem($event, item, i) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log(this.grid.indexOf(item));
    console.log(this.components[this.grid.indexOf(item)]);
    this.grid.splice(this.grid.indexOf(item), 1);
  }

  handleDashboardDelete(event) {
    event.preventDefault();
    this.messageService.add({ severity: "warn", detail: "Deleting Dashboard" });
    setTimeout(() => {
      this.dashboardService.deleteDashboard();
    }, 2000);
    
  }

  toggleFormStatus() {
    this.formOpen = !this.formOpen;
  }
}
