import { Component, OnInit } from '@angular/core';
import {TreeModule} from 'primeng/tree';
import { TreeNode } from 'primeng/components/common/treenode';
import { ReportService } from '../report.service';
import { DashboardService } from '../dashboard.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  data:TreeNode[];
  user_name
  constructor(private reportService:ReportService,private dashboardService:DashboardService,private userService:UserService) { }

  ngOnInit() {
    this.user_name = this.userService.getUsername()
    // console.log(this.user_name)
  }

}
