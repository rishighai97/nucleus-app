import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nucleus';
  isLoggedIn=false
  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.isLoggedInStream.subscribe((e:any)=>{
      this.isLoggedIn = e.isLoggedIn
    })
  }

}
