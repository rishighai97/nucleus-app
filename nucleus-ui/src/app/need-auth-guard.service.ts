import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class NeedAuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if(localStorage.getItem('user-token')!=null){
      console.log("here")
      this.userService.addToken(localStorage.getItem('user-token'))
      if(state.url==="" || state.url==="/"){
        console.log(this.userService.getUserRole())
        if(this.userService.getUserRole()==='ROLE_DEV'){
          this.router.navigate(["data_source"])
        }else{
          this.router.navigate(["end_user_home"])
        }
      }
      return true
    }
  
  //  console.log(this.userService.isUserLoggedIn())
    if(this.userService.isUserLoggedIn()==true) {
      return true;
    }

    if(state.url==="" || state.url==="/"){
      this.router.navigateByUrl('home');
      return true
    }
    

    console.log("noo")
    this.router.navigateByUrl('login');
    return false;
  }
}