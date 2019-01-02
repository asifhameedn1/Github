import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../Models/Task';
import { environment } from '../../environments/environment.prod';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  let taskData: Task;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.get(TaskService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([TaskService], (s: TaskService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the task data', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length > 0);
    });
    const httpReq = httpMock.expectOne(environment.url + 'GetTasks', 'Gets all Tasks');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should get the task data', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks.length > 0);
    });
    const httpReq = httpMock.expectOne(environment.url + 'GetTasks', 'Gets all Tasks');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should get the parents data', () => {
    service.getParents().subscribe(parents => {
      expect(parents.length > 0);
    });
    const httpRequest = httpMock.expectOne(environment.url + 'GetParents', 'Gets all Parents');
    expect(httpRequest.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should get the task data by id', () => {
    service.getTaskById(1).subscribe(task => {
      expect(task).toBeTruthy();
    });
    const httpTask = httpMock.expectOne(environment.url + 'GetTaskById/1', 'Gets selected task');
    expect(httpTask.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should post the task data', () => {
    taskData = new Task();
    taskData.TaskName = 'TestDatainject';
    taskData.ParentID = 2;
    taskData.Priority = 4;
    taskData.StartDate = new Date(2015, 9, 22);
    taskData.EndDate = new Date(2018, 9, 22);
    service.postTask(taskData).subscribe((data: any) => {
      expect(data.ParentID).toBe(2);
    });

    const req = httpMock.expectOne(environment.url + 'Task', 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      TaskName: 'TestDatainject',
      ParentID: 2,
      Priority: 4,
      StartDate: new Date(2015, 9, 22),
      EndDate: new Date(2018, 9, 22)
    });

    httpMock.verify();
  });

  it('should updates the task data', () => {
    taskData = new Task();
    taskData.ID = 2;
    taskData.TaskName = 'updatesDatainject';
    taskData.ParentID = 2;
    taskData.Priority = 4;
    taskData.StartDate = new Date(2015, 9, 22);
    taskData.EndDate = new Date(2018, 9, 22);
    service.putTask(taskData).subscribe((data: any) => {
      expect(data.ID).toBe(2);
    });

    const req = httpMock.expectOne(environment.url + 'UpdateTask', 'Updates the task');
    expect(req.request.method).toBe('PUT');

    req.flush({
      ID: 2,
      TaskName: 'updatesDatainject',
      ParentID: 2,
      Priority: 4,
      StartDate: new Date(2015, 9, 22),
      EndDate: new Date(2018, 9, 22)
    });

    httpMock.verify();
  });

  it('should delete the task data', () => {
    service.deleteTask(4).subscribe((data: any) => {
      expect(data).toBe(4);
    });

    const req = httpMock.expectOne(environment.url + 'DeleteTask/4', 'Delete the task');
    expect(req.request.method).toBe('DELETE');

    req.flush(4);

    httpMock.verify();
  });
});
