import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { MessageService } from "primeng/components/common/api";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private formbuilder:FormBuilder,
    private router:Router,
    private activated:ActivatedRoute,
    private service:UserService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.loginForm=this.formbuilder.group({
      username:[''],
      password:[''],
  })
  }

  doLogin(event){
    let credentials=this.loginForm.value
    console.log(credentials)
    this.service.doLogin(credentials)
    
  }


}
