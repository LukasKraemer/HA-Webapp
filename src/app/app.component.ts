import {Component, OnInit} from '@angular/core';
import { GlobalConstants } from './common/global-constants';
import {TokenStorageService} from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private role;
  isLoggedIn = false;
  ispython = false;
  ischart = false;
  showAdminBoard = false;
  username?: string;
  title = GlobalConstants.sitetitle;
  policy: boolean;
  privacypolicy = GlobalConstants.privacypolicy;
  imprint = GlobalConstants.imprimt;


  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.role = user.permission;
      this.showAdminBoard = this.role === 10;
      this.ispython = this.role >= 1 && this.role !== 7 && this.role !== 8;
      this.ischart = this.role >= 6 && this.role !== 9;
      this.username = user.username;
    }
    this.policy = !!(GlobalConstants.privacypolicy && GlobalConstants.imprimt);

  }
  openNav(): void {
  try {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  } catch (e) {}
  }

  closeNav(): void {
    try {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }catch (e) {}
    }

  logout(): void {
    this.isLoggedIn = false;
    this.tokenStorageService.signOut();
    window.location.replace('./home');
  }


}
