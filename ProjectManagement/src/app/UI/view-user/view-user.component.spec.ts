import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserfilterPipe } from './userfilter.pipe';
import { UserService } from '../../Service/user.service';
import { MockUser } from '../../Service/mockuserservice';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ViewUserComponent, UserfilterPipe],
      providers: [{ provide: UserService, useClass: MockUser }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load all users', () => {
    component.ngOnInit();
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should set sort variable', () => {
    component.sortUsers('EmployeeID');
    expect(component.sortvar).toBe('EmployeeID');
  });

  it('should set sort variable', () => {
    component.deleteUser(1);
    expect(component.users.length).toBeGreaterThan(0);
  });
});
