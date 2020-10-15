import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarListItems = false;
  username = '';
  isLoggedin = false;

  constructor() { }

  ngOnInit(): void {
    this.getUserLoginData();
  }

  getUserLoginData() {
    if (localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData')) {
      this.isLoggedin = true;
      this.username = localStorage.getItem('registrationData') || localStorage.getItem('temporaryUserData');
    }
  }

  toggleSidebar(value) {
    if (value === 'open') {
      document.getElementById('sidebar').classList.add('toggleSidebar');
      setTimeout(() => {
        this.sidebarListItems = true;
      }, 400);
    } else if (value === 'close') {
      this.sidebarListItems = false;
      document.getElementById('sidebar').classList.remove('toggleSidebar');
    }
  }

  logOut() {
    localStorage.removeItem('registrationData');
    localStorage.removeItem('temporaryUserData');
    window.location.reload();
    this.isLoggedin = false;
  }

}
