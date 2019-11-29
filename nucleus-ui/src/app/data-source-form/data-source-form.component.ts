import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DataSourceService } from "../data-source.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: "app-data-source-form",
  templateUrl: "./data-source-form.component.html",
  styleUrls: ["./data-source-form.component.css"]
})
export class DataSourceFormComponent implements OnInit {
  jdbcForm: FormGroup;
  restForm: FormGroup;
  error_message=null;
  errors = {};
  connType = "jdbc";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataSourceService: DataSourceService,
    private messageService: MessageService 
  ) {}

  getConnType(conn) {
    this.connType = conn;
    if (conn == "jdbc") this.restForm.errors;
  }

  ngOnInit() {

    this.dataSourceService.invalidConnectionStream.subscribe((e:any)=>{      

        this.error_message=e.error;
        //  setInterval(()=>{
        //   this.error_message=null
        //  },4000)
        if(this.error_message===""){
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Source Has beed successfully configured'})
        }else{
          this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Incorred Data Source'})
        }
       
       
    })

    this.jdbcForm = this.fb.group({
      data_source_name: ["", [Validators.required]],
      database_type: [""],
      url: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.restForm = this.fb.group({
      rest_name: ["", [Validators.required]],
      rest_url: ["", [Validators.required]]
    });

    let dataSourceNameControl = this.jdbcForm.get("data_source_name");
    let urlControl = this.jdbcForm.get("url");
    let usernameControl = this.jdbcForm.get("username");
    let passwordControl = this.jdbcForm.get("password");

    let restNameControl = this.restForm.get("rest_name");
    let restUrlControl = this.restForm.get("rest_url");

    dataSourceNameControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = dataSourceNameControl.errors;
        if (errors.required) {
          this.errors["data_source_name"] =
            "Please enter the data source name of the sql db";
        }
      } else {
        delete this.errors["data_source_name"];
      }
    });

    urlControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = urlControl.errors;
        if (errors.required) {
          this.errors["url"] = "Please enter the url of the sql db";
        }
      } else {
        delete this.errors["url"];
      }
    });

    usernameControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = usernameControl.errors;
        if (errors.required) {
          this.errors["username"] = "Please enter the username of the sql db";
        }
      } else {
        delete this.errors["username"];
      }
    });

    passwordControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = passwordControl.errors;
        if (errors.required) {
          this.errors["password"] = "Please enter the password of the sql db";
        }
      } else {
        delete this.errors["password"];
      }
    });

    restNameControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = restNameControl.errors;
        if (errors.required) {
          this.errors["rest_name"] =
            "Please enter the data source name for the rest api";
        }
      } else {
        delete this.errors["rest_name"];
      }
    });

    restUrlControl.statusChanges.subscribe(e => {
      if (e === "INVALID") {
        let errors = urlControl.errors;
        if (errors.required) {
          this.errors["rest_url"] = "Please enter the url for the rest api";
        }
      } else {
        delete this.errors["rest_url"];
      }
    });
  }

  getAllJdbcErrors() {
    let data_source_name_errors = this.jdbcForm.get("data_source_name").errors;
    if (data_source_name_errors) {
      if (data_source_name_errors.required) {
        this.errors["data_source_name"] =
          "Please enter the data source name of the sql db";
      }
    } else {
      delete this.errors["data_source_name"];
    }

    let url_errors = this.jdbcForm.get("url").errors;
    if (url_errors) {
      if (url_errors.required) {
        this.errors["url"] = "Please enter the url of the sql db";
      }
    } else {
      delete this.errors["url"];
    }

    let username_errors = this.jdbcForm.get("username").errors;
    if (username_errors) {
      if (username_errors.required) {
        this.errors["username"] = "Please enter the username of the sql db";
      }
    } else {
      delete this.errors["userame"];
    }

    let password_errors = this.jdbcForm.get("password").errors;
    if (password_errors) {
      if (password_errors.required) {
        this.errors["password"] = "Please enter the password of the sql db";
      }
    } else {
      delete this.errors["password"];
    }
  }

  getAllRestErrors() {
    let rest_name_errors = this.restForm.get("rest_name").errors;
    if (rest_name_errors) {
      if (rest_name_errors.required) {
        this.errors["rest_name"] =
          "Please enter the data source name for the rest api";
      }
    } else {
      delete this.errors["rest_name"];
    }

    let rest_url_errors = this.restForm.get("rest_url").errors;
    if (rest_url_errors) {
      if (rest_url_errors.required) {
        this.errors["rest_url"] = "Please enter the url for the rest api";
      }
    } else {
      delete this.errors["rest_url"];
    }
  }

  handleSubmit(conn) {
    if (conn === "jdbc") {
      if (this.jdbcForm.valid) {
        console.log("jdbc valid");
        let connection = {
          "data_source_name": this.jdbcForm.get("data_source_name").value,
          "database_name": this.jdbcForm.get("database_type").value,     
          "type": "jdbc",
          "url": this.jdbcForm.get("url").value,
          "username": this.jdbcForm.get("username").value,
          "password": this.jdbcForm.get("password").value
        };
        this.dataSourceService.addConnection(connection)
        this.jdbcForm.reset()
        this.errors={}
      }
    }
    if (conn === "rest") {
      if (this.restForm.valid) {
        console.log("rest valid");
        let connection = {
          "data_source_name": this.restForm.get("rest_name").value,
          "url": this.restForm.get("rest_url").value,
          "type": "rest"
        };
        this.dataSourceService.addConnection(connection)
        this.restForm.reset()
        this.errors={}
      }
    }
   
  }

  onFormSubmit(conn) {
    if (conn == "jdbc") this.getAllJdbcErrors();
    else this.getAllRestErrors();
  }
}
