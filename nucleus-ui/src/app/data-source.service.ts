import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class DataSourceService {
  selectedConnections = {};
  connections = [];
  selectedConnectionStream = new Subject();
  connectionStream = new Subject();
  invalidConnectionStream= new Subject();

  getConnections() {
    return this.connections;
  }

  // nucleus-core ms
  // connections=>success/failure
  addConnection(connection) {
    let apiUrl = `http://localhost:7000/nucleus_core/v1/store_connection/${this.userService.getUserId()}`;

    this._http.post(apiUrl, connection).subscribe((e:any) => {
      console.log(e)
      if (e != "failure" && e!=false ) {
        connection["id"]=e
        this.connections.push(connection);
        this.connectionStream.next({ connections: this.connections });
        console.log(this.connections)
        this.invalidConnectionStream.next({error:""})
      }else{
        console.log("failed")
        this.invalidConnectionStream.next({error:"Data source does not exist"})
      }
    },error=>{
      this.invalidConnectionStream.next({error:"Data source does not exist"})
    })
  }
  // nucleus-core ms
  // =>connections
  getAllConnections() {
    let apiUrl = `http://localhost:7000/nucleus_core/v1/get_connections/${this.userService.getUserId()}`;
    return this._http.get(apiUrl);
  }
  //SQL ms
  //connection=>query results
  getData(connection) {
    let apiUrl = "http://localhost:7001/sql/v1/execute_query/";
    return this._http.post(apiUrl, connection);
  }

  //SQL ms
  //connection=>table and column meta data
  getTablesForConnection(connection: any) {
    let url = connection["url"];
    let db = url.split("/");
    let apiUrl = "http://localhost:7001/sql/v1/get_tables";
    return this._http.post(apiUrl, connection);
  }

  //-----------------------------------------------------------------------------------------------------------------

  getconnectionStream() {
    return this.connectionStream;
  }

  getSelectedConnectionStream() {
    return this.selectedConnectionStream;
  }

  addSelectedConnection(connection) {
    this.selectedConnections = {};
    this.selectedConnections[connection.id] = connection;
    this.selectedConnectionStream.next(this.selectedConnections);
  }

  flushSelectedConnections() {
    this.selectedConnections = {};
  }

  constructor(private _http: HttpClient,private userService:UserService,) {}
}
