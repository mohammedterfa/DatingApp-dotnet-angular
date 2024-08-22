import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getRoles ():Observable<Role[]>
  {
    return this.http.get<Role[]>(`${this.apiUrl}roles`);
  }
}
