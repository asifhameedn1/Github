import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Models/Task';

import { ParentTasks } from '../Models/ParentTasks';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:15318/api/';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }

  getTasks(): Observable<Task[]> {
    return this.http.get<any>(url + 'GetTasks');
  }

  getParents(): Observable<ParentTasks[]> {
    return this.http.get<any>(url + 'GetParents');
  }

  getTaskById(Id: number): Observable<Task> {
    return this.http.get<any>(url + 'GetTaskById/' + Id);
  }

  postParent(parent: ParentTasks): Observable<any> {
    return this.http.post<any>(url + 'ParentTask', JSON.stringify(parent), httpOptions);
  }

  postTask(task: Task): Observable<Task> {
    return this.http.post<any>(url + 'Task', JSON.stringify(task), httpOptions);
  }

  putTask(task: Task): Observable<Task> {
    return this.http.put<any>(url + 'UpdateTask', JSON.stringify(task), httpOptions);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<any>(url + 'DeleteTask/' + id, httpOptions);
  }
}
