import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { MockUser } from '../../Service/mockuserservice';
import { User } from '../../Models/User';

@Component({ selector: 'app-view-user', template: '' })
class ViewUserComponent { }

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [AddUserComponent, ViewUserComponent],
      providers: [{ provide: UserService, useClass: MockUser }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Load User', () => {
    component.ngOnInit();
    component.initialiseInvites();
    expect(component.user.EmployeeID).toEqual(undefined);
  });

  it('Submit User', () => {
    component.submitUser();
    expect(component.user.UserID).toEqual(undefined);
  });

  it('Reset User', () => {
    component.reset();
    expect(component.user.EmployeeID).toEqual(undefined);
  });
});
