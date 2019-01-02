import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { Project } from '../Models/Project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:15318/api/';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {

  }

  getUser(): Observable<User[]> {
    return this.http.get<any>(url + 'User');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(url + 'Project');
  }

  getProjectById(Id: number): Observable<Project> {
    return this.http.get<Project>(url + 'Project/' + Id);
  }

  postProject(project: Project): Observable<any> {
    // console.log(project);
    return this.http.post<any>(url + 'Project', JSON.stringify(project), httpOptions);
  }
}
