import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  return = '';

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.route.queryParams
      .subscribe(params => this.return = params['return']);
  }

  onSubmit(form: NgForm) {
    const credentials = { username: form.value.username, password: form.value.password };
    this.authService.login(credentials).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.authService.updateUser();

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.messageService.add({ severity: 'success', summary: 'Successful Login', detail: 'Logged in as ' + this.roles + '.' });
        if (this.return !== '') {
          this.router.navigateByUrl(this.return);
        } else {
          this.router.navigate(['/students']);
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
        this.errorMessage = err.error.message;
        form.value.password = '';
        this.isLoginFailed = true;
      }
    );
  }


}
