import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../Models/Project';
import { environment } from '../../environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  // let project: Project;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.get(ProjectService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProjectService], (service1: ProjectService) => {
    expect(service1).toBeTruthy();
  }));

  it('should get the project data', () => {
    service.getProjects().subscribe(projects => {
      expect(projects.length > 0);
    });
    const httpReq = httpMock.expectOne(environment.url + 'Project', 'Gets all projects');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should get all users', () => {
    service.getUser().subscribe(users => {
      expect(users.length > 0);
    });
    const httpReq = httpMock.expectOne(environment.url + 'User', 'Gets all users');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should get the project data by id', () => {
    service.getProjectById(1).subscribe(task => {
      expect(task).toBeTruthy();
    });
    const httpTask = httpMock.expectOne(environment.url + 'Project/1', 'Gets selected project');
    expect(httpTask.request.method).toEqual('GET');
    httpMock.verify();
  });

  it('should post the task data', () => {
    const project = new Project();
    project.ProjectName = 'TestDatainject';
    project.ManagerID = 2;
    project.Priority = 4;
    project.StartDate = new Date(2015, 9, 22);
    project.EndDate = new Date(2018, 9, 22);
    service.postProject(project).subscribe((data: any) => {
      expect(data.ManagerID).toBe(2);
    });

    const req = httpMock.expectOne(environment.url + 'Project', 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      ProjectName: 'TestDatainject',
      ManagerID: 2,
      Priority: 4,
      StartDate: new Date(2015, 9, 22),
      EndDate: new Date(2018, 9, 22)
    });

    httpMock.verify();
  });
});
