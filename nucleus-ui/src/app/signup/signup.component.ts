import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup
  constructor(private formbuilder:FormBuilder,private router:Router,private activated:ActivatedRoute,private service:UserService) { }
  ngOnInit() {
    this.signupForm=this.formbuilder.group({
        username:[''],
        password:[''],
        role:['']
    })
  }
  submit(event)
  {
    console.log(this.signupForm.value);
    let values=this.signupForm.value;
    this.service.doSignup(values)
  }
}
