import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  isLoggedIn: boolean;
  constructor(
    private toastr: ToastrService
  ) {
    this.isLoggedIn = false;
    this.loggedIn();
  }

  ngOnInit(): void {
  }

  loggedIn(): void {
    if(localStorage.getItem('flogin') === 'success' || localStorage.getItem('slogin') === 'success') {
      this.isLoggedIn = true;
    }
  }

  async logout(): Promise<void> {
    localStorage.clear();
    this.toastr.info('Successful', 'LogOut');
    await this.delay(1000);
    window.location.reload();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
