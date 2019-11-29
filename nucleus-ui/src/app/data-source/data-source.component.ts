import { Component, OnInit } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { DataSourceService } from '../data-source.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnInit {
  connections=[]
  formOpen=false
  isLoggedIn
  user_role
  username
  constructor(private dataSourceService:DataSourceService,private userService:UserService) { 
   
  }

  ngOnInit() {
     this.user_role=this.userService.getUserRole()
     this.connections=this.dataSourceService.getConnections()
     this.username = this.userService.getUsername()
     this.dataSourceService.getAllConnections().subscribe((response:any)=>{
       //this.dataSourceService.addConnection(response)
       this.dataSourceService.connections=response
       this.connections=response
     })
     this.dataSourceService.getconnectionStream().subscribe((response:any)=>{
      console.log(response.connections)
       this.connections=response.connections
     })
     this.userService.isLoggedInStream.subscribe((e: any) => {
      this.isLoggedIn = e.isLoggedIn;
      this.user_role = e.user_role;
      console.log("chal na aee")
    });
    
     
  }



  toggleFormStatus(){
    this.formOpen=!this.formOpen
  }

}
