import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalConstants} from '../common/global-constants';
import {Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

const AUTH_API = GlobalConstants.apiUrl ;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router,private token: TokenStorageService) {
  }
  login(username: string, password: string): Observable<any> {
    const body = JSON.stringify({ username , password});
    return this.http.post(AUTH_API + 'gentoken', body, httpOptions);
  }

  check(): void{
    const permissionCode = this.checkPermission();
    if (permissionCode === 1){
      window.location.replace('./error/notLoggedIn');
    } else if (permissionCode === 2) {
      window.location.replace('./error/lessPermission');
    }
  }
  private checkPermission(): number{
    const permission =  this.token.getUser().permission;
    if (isNaN(permission)){
      return 1;
    }
    if (this.router.url === '/app' && permission !== 7 && permission !== 8 && permission !== 1)
    {
      return 0;
    }
    else if (this.router.url === '/admin' && permission  >= 8){
      return 0;
    }else if (this.router.url === '/chart' || this.router.url === '/table' && permission >= 6 && permission !== 9) {
      return 0;
    }else{
      return 2;
    }
  }
}
