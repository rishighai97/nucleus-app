import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { DashboardService } from './dashboard.service';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn:boolean=false;
  userAuthToken=null
  user_id:any
  user_role:any
  user_name:any
  isLoggedInStream = new Subject()


  getToken(){
    return this.userAuthToken
  }

  getUsername(){
    return this.user_name
  }

  getIsLoggedInStream(){
    return this.userAuthToken
  }

  isUserLoggedIn(){
    return this.isLoggedIn
  }

  getUserId(){
    return this.user_id
  }

  getUserRole(){
    return this.user_role
  }

  addToken(token){
    this.userAuthToken=token
    this.isLoggedIn=true
    var decoded = jwt_decode(this.userAuthToken);
    this.user_id=decoded.user_id
    this.user_role = decoded.user_role
    this.user_name = decoded.sub
    this.isLoggedInStream.next({isLoggedIn:this.isLoggedIn,user_role:this.user_role})

  }

  allowAccess(){
    this.isLoggedIn=true
    this.isLoggedInStream.next({isLoggedIn:this.isLoggedIn,user_role:this.user_role})
  }

  doLogin(credentials){
   
    let url = "http://localhost:7000/login";
    this._http.post(url, credentials)
      .subscribe((e: any) => {
        this.userAuthToken = e.token;
        let decoded = this.decodeToken();

        localStorage.setItem('user-token', e.token)
        this.user_id = decoded.user_id;
        this.user_name = decoded.sub
        this.user_role = decoded.user_role;
        console.log(this.user_role)
        this.isLoggedIn=true
        this.isLoggedInStream.next({isLoggedIn:this.isLoggedIn,user_role:this.user_role})
        this.router.navigate(['data_source'])
      }, error => {
        this.isLoggedIn=false
        this.isLoggedInStream.next({isLoggedIn:this.isLoggedIn})
        window.alert("Invalid Credentials")
      })
    
  }

  doLogout(){
    this.isLoggedIn=false
    this.isLoggedInStream.next({isLoggedIn:this.isLoggedIn})
    localStorage.removeItem('user-token');
    this.router.navigate(['home'])
  }

  doSignup(values){
    let api="http://localhost:7000/users/register";
    this._http.post(api,values)
    .subscribe(e=>{
      this.router.navigate(['login'])
    },error=>{
        window.alert("Username is taken! Please use other username")
    });
  }
 
  decodeToken() {
    var decoded = jwt_decode(this.userAuthToken);
    //this.user_name = decoded.sub;
    return decoded
  }
  

  constructor(private router:Router,private _http:HttpClient) { }
}
