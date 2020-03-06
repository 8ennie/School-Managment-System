import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  user: User;
  isAuthenticated = false;
  userSub: Subscription;
  constructor(private authService: AuthService) { }
  isMenuCollapsed;

  ngOnInit() {
    this.isAuthenticated = this.authService.isAthenticated();
    this.user = this.authService.getUser();
    this.userSub = this.authService.userChanges.subscribe((user: User) => {
      this.isAuthenticated = this.authService.isAthenticated();
      if (user !== null) {
        this.user = user;

      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
