import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { User } from './user.model';
import { Teacher } from '../teachers/teacher.model';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {

  userChanges = new Subject<User>();

  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) { }

  login(credentials): Observable<any> {
    console.log(AUTH_API+ 'signin');
    
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  registerTeacher(teacher: Teacher): Observable<any> {
    return this.http.post(AUTH_API + 'signup/teacher', teacher, httpOptions);
  }


  isAthenticated() {
    return !!this.tokenStorage.getToken();
  }

  logout() {
    this.tokenStorage.signOut();
  }

  getUser() {
    return this.tokenStorage.getUser();
  }

  getRoles(): string[] {
    return this.tokenStorage.getUser().roles;
  }

  updateUser() {
    this.userChanges.next(this.getUser());
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }
}
