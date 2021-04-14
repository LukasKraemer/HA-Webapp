import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-permission-error',
  templateUrl: './permission-error.component.html',
  styleUrls: ['./permission-error.component.css']
})
export class PermissionErrorComponent implements OnInit {
  errormsg: any;
  output: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadError();
  }
loadError(): void{
  this.errormsg = this.route.snapshot.params.error;
  console.log(this.route.snapshot.paramMap.get('error'));
  console.log(this.errormsg);
  if (this.errormsg === 'notLoggedIn'){
    this.output = 'Please login in <br><a href="./login" [routerLink]="/login">LOGIN</a>';
  }else if ( this.errormsg === 'lessPermission'){
    this.output = 'No Permission for this Task';
  }else if ( this.errormsg === 'notFounded'){
    this.output = 'Function is not implemented';
  }
  else{
    this.output = 'unknown Error';
  }
}
}
