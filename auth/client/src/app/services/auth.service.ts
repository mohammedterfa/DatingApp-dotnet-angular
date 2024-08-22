import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http:HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse>
  {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response)=> {
          if(response.isSuccess){
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
    )
  }


  private getToken = (): string|null => localStorage.getItem(this.tokenKey) || '';

  isLoggedIn = (): boolean=> {
    const token =  this.getToken();
    if(!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! *1000;

    if(isTokenExpired) this.logout();

    return isTokenExpired;
  }

  logout = ():void => {
    localStorage.removeItem(this.tokenKey);
  }

  getUserDetail(){
    const token = this.getToken();
    if(!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName : decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || []
    }

    return userDetail;

  }


  register(data: RegisterRequest): Observable<AuthResponse>
  {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  getDetail(): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.apiUrl}account/detail`);
  }
}
