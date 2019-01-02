import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { User } from '../Models/User';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([UserService], (s: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all users', () => {
    service.getUser().subscribe(users => {
      expect(users.length > 0);
    });
    const httpReq = httpMock.expectOne(environment.url + 'User', 'Gets all users');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should get user by id', () => {
    service.getUserById(1).subscribe(users => {
      expect(users).toBeTruthy();
    });
    const httpReq = httpMock.expectOne(environment.url + 'User/1', 'Gets the user');
    expect(httpReq.request.method).toEqual('GET'); // .toBe('GET');
    httpMock.verify();
  });

  it('should post the task data', () => {
    const user = new User();
    user.FirstName = 'TestDatainject';
    user.EmployeeID = 2;
    user.UserID = 4;
    user.LastName = 'asdas';
    service.postUser(user).subscribe((data: any) => {
      expect(data.EmployeeID).toBe(2);
    });

    const req = httpMock.expectOne(environment.url + 'User', 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      FirstName: 'TestDatainject',
      EmployeeID: 2,
      UserID: 4,
      LastName: 'asdas'
    });
    httpMock.verify();
  });

  it('should delete the user data', () => {
    service.deleteUser(4).subscribe((data: any) => {
      expect(data).toBe(4);
    });

    const req = httpMock.expectOne(environment.url + 'User/4', 'Delete the user');
    expect(req.request.method).toBe('DELETE');

    req.flush(4);

    httpMock.verify();
  });
});
