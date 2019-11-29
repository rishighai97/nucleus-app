import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user_role: any;
  isLoggedIn = false;
  // user_role
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedInStream.subscribe((e: any) => {
      this.isLoggedIn = e.isLoggedIn;
      this.user_role = e.user_role;
    });
  }

  logout(event) {
    this.userService.doLogout();
  }
}
