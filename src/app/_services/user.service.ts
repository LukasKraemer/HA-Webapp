import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalConstants} from '../common/global-constants';
import {TokenStorageService} from './token-storage.service';

export interface Download {
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  progress: number;
  content: Blob | null;
}

const API_URL = GlobalConstants.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    })
  };

  getFilenames(): Observable<any> {
    return this.http.get(API_URL + 'app/filename', this.httpOptions);
  }

  startPython(): Observable<any> {
    return this.http.get(API_URL + 'app/start', this.httpOptions);
  }

  getCurrentDataState(): Observable<any> {
    return this.http.get(API_URL + 'app/reader', this.httpOptions);
  }

  txtUpload(file: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    });
    return this.http.post(API_URL + 'app/filename', file, {headers});
  }
  getMissing(): Observable<any> {
    return this.http.get(API_URL + 'app/missing', this.httpOptions);
  }

  getTxt(filename: string): Observable<any> {

    const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenStorageService.getToken()
      });
    return this.http.get(API_URL + 'app/getTxt/' + filename, {headers, responseType: 'blob' as 'json'});
  }
}
