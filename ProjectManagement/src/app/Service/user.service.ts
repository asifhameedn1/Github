import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:15318/api/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(url + 'User');
  }

  getUserById(Id: number): Observable<User> {
    return this.http.get<User>(url + 'User/' + Id);
  }

  postUser(user: User): Observable<any> {
    // console.log(user);
    return this.http.post<any>(url + 'User', JSON.stringify(user), httpOptions);
  }

  deleteUser(Id: number): Observable<any> {
    return this.http.delete<any>(url + 'User/' + Id, httpOptions);
  }
}
